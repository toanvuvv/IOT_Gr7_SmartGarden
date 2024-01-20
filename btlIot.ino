#include <Wire.h>
#include <DHT.h>
#include <BH1750.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <thread>

const int DHTPIN = 5;
const int DHTTYPE = DHT11;
const int ledPin = 2;
const int earthSensorPin = 35;
const int relayPin = 23;

const char* ssid = "Vuduyhiep";
const char* password = "vuduyhiep";
const char* mqtt_server = "172.20.10.2";
const char* mqtt_client_id = "esp32_client";
const char* mqtt_topic = "esp32/data";
const char* mqtt_control_topic = "control";
const char* mqtt_username = "";
const char* mqtt_password = "";

const char* mqtt_from_esp32 = "from-esp32";

int ledAutoMode = 0;
int pumpAutoMode = 0;
int ledMode = 0;
int pumpMode = 0;

WiFiClient espClient;
PubSubClient mqttClient(espClient);
StaticJsonDocument<200> jsonData, jsonLedtPumpStatus;

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);
BH1750 lightMeter(0x23);

unsigned long previousMillis = 0;
const long interval = 2000;

void connectWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Đang kết nối WiFi...");
    delay(2000);
  }
  Serial.println("Đã kết nối WiFi");

  mqttClient.setServer(mqtt_server, 1883);
  mqttClient.setCallback(callback);

  if (!mqttClient.connected()) {
    reconnectMQTT();
  }
}

void reconnectMQTT() {
  while (!mqttClient.connected()) {
    Serial.println("Đang thử kết nối MQTT...");
    if (mqttClient.connect(mqtt_client_id, mqtt_username, mqtt_password)) {
      Serial.println("Đã kết nối tới MQTT broker");
      mqttClient.subscribe(mqtt_control_topic);
    } else {
      Serial.print("Kết nối thất bại, rc=");
      Serial.print(mqttClient.state());
      Serial.println("Thử lại sau 5 giây...");
      delay(5000);
    }
  }
}

void sendStatusLedPump(int ledStatus, int pumpStatus, String name) {
  jsonLedtPumpStatus["ledStatus"] = ledStatus;
  jsonLedtPumpStatus["pumpStatus"] = pumpStatus;
  jsonLedtPumpStatus["ledAutoMode"] = ledAutoMode;
  jsonLedtPumpStatus["pumpAutoMode"] = pumpAutoMode;

  if (name != "") {
    jsonLedtPumpStatus["name"] = name.c_str();
  }
  else {
    jsonLedtPumpStatus.remove("name");
  }

  char jsonString[200];
  serializeJson(jsonLedtPumpStatus, jsonString);

  mqttClient.publish(mqtt_from_esp32, jsonString);
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Nhận tin nhắn từ chủ đề: ");
  Serial.println(topic);

  String payloadStr = "";
  for (int i = 0; i < length; i++) {
    payloadStr = payloadStr + char(payload[i]);
  }

  Serial.println(payloadStr);

  String jsonMessage = payloadStr;
  Serial.print("Got Message: ");
  Serial.println(jsonMessage);

  // Định nghĩa bộ đệm cho JSON để phân tích
  DynamicJsonDocument jsonDoc(200);

  // Phân tích chuỗi JSON
  DeserializationError error = deserializeJson(jsonDoc, jsonMessage.c_str());

  // Kiểm tra lỗi khi phân tích
  if (error) {
    Serial.print(F("Lỗi khi phân tích JSON: "));
    Serial.println(error.c_str());
    return;
  }

  int ledMode = jsonDoc["ledMode"];
  int pumpMode = jsonDoc["pumpMode"];
  ledAutoMode = jsonDoc["ledAutoMode"];
  pumpAutoMode = jsonDoc["pumpAutoMode"];
  String name = jsonDoc["name"];

  if (ledAutoMode == 0) {
    if (ledMode == 0) {
      digitalWrite(ledPin, LOW);  // Tắt LED
    } else if (ledMode == 1) {
      digitalWrite(ledPin, HIGH);  // Bật LED
    }
  }

  if (pumpAutoMode == 0) {
    if (pumpMode == 0) {
      digitalWrite(relayPin, HIGH);  // Tắt
    } else if (pumpMode == 1) {
      digitalWrite(relayPin, LOW);  // Bật
    }
  }
  
  sendStatusLedPump(ledMode, pumpMode, name);
}

void handlePumpControl(String action) {
  // Parse tin nhắn JSON
  StaticJsonDocument<200> jsonDoc;
  deserializeJson(jsonDoc, action);

  // Kiểm tra giá trị của trường "control"
  bool controlValue = jsonDoc["control"];

// Thực hiện điều khiển máy bơm dựa trên giá trị "control"
  if (controlValue) {
    digitalWrite(relayPin, LOW);  // Bật máy bơm
    Serial.println("Máy bơm được bật");
  } else {
    digitalWrite(relayPin, HIGH);  // Tắt máy bơm
    Serial.println("Máy bơm được tắt");
  }
}

void handleLightControl(String action) {
  // Parse tin nhắn JSON
  StaticJsonDocument<200> jsonDoc;
  deserializeJson(jsonDoc, action);

  // Kiểm tra giá trị của trường "control"
  bool controlValue = jsonDoc["control"];

  // Thực hiện điều khiển đèn dựa trên giá trị "control"
  if (controlValue) {
    digitalWrite(ledPin, LOW);  // Đèn sáng
    Serial.println("Đèn được bật");
  } else {
    digitalWrite(ledPin, HIGH);  // Đèn tắt
    Serial.println("Đèn được tắt");
  }
}

void controlAutoLedAndPump() {
  if (ledAutoMode == 1) {
    float lightValue = lightMeter.readLightLevel();
    ledControl(lightValue);
  }

  if (pumpAutoMode == 1) {
    float earthMoisture = earthMoisturePercent(analogRead(earthSensorPin));
    pumpControl(earthMoisture);
  }

  if (ledAutoMode == 1 || pumpAutoMode == 1) {
    sendStatusLedPump(ledMode, pumpMode, "");
  }
}

void manualControl() {
  while (true) {
    mqttClient.loop();
    delay(500);
  }
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();

  dht.begin();
  Wire.begin();
  lightMeter.begin();
  pinMode(ledPin, OUTPUT);
  pinMode(earthSensorPin, INPUT);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);

  connectWiFi();
  std::thread manualControlThread(manualControl);
  manualControlThread.detach();
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    Serial.println("Đã qua khoảng thời gian");

    controlAutoLedAndPump();

    lcd.clear();
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    float lightValue = lightMeter.readLightLevel();
    float earthMoisture = earthMoisturePercent(analogRead(earthSensorPin));

    printSerial(temperature, humidity, lightValue, earthMoisture);
    printLCD(temperature, humidity, lightValue, earthMoisture);

    if (!mqttClient.connected()) {
      reconnectMQTT();
    }

    sendMQTTData(temperature, humidity, lightValue, earthMoisture);
  }
  delay(5000);
}

void sendMQTTData(float temperature, float humidity, float lightValue, float earthMoisture) {
  jsonData["from"] = "esp32";
  jsonData["temperature"] = temperature;
  jsonData["humidity"] = humidity;
  jsonData["lightValue"] = lightValue;
  jsonData["earthMoisture"] = earthMoisture;

  char jsonString[200];
  serializeJson(jsonData, jsonString);

  mqttClient.publish(mqtt_topic, jsonString);
}

void pumpControl(float earthMoisture) {
  if (earthMoisture < 30) {
    digitalWrite(relayPin, LOW);
    pumpMode = 1;
  } else {
    digitalWrite(relayPin, HIGH);
    pumpMode = 0;
  }
}

float earthMoisturePercent(int analog) {
  float virtualPercent = map(analog, 0, 4095, 0, 100);
  float result = 100 - virtualPercent;
  return result;
}

void ledControl(float lightValue) {
  if (lightValue < 30) {
    digitalWrite(ledPin, HIGH);
    ledMode = 1;
  } else {
    digitalWrite(ledPin, LOW);
    ledMode = 0;
  }
}

void printSerial(float temperature, float humidity, float lightValue, float earthMoisture) {
  Serial.print("Nhiet do: ");
  Serial.print(temperature);
  Serial.println(" C");

  Serial.print("Do am: ");
  Serial.print(humidity);
  Serial.println("%");

  Serial.print("Anh sang: ");
  Serial.print(lightValue);
  Serial.println(" lx");

  Serial.print("Do am dat: ");
  Serial.print(earthMoisture);
  Serial.println("%");
}

void printLCD(float temperature, float humidity, float lightValue, float earthMoisture) {
  lcd.setCursor(0, 0);
  lcd.print(temperature);
  lcd.print("C");

  lcd.setCursor(8, 0);
  lcd.print(humidity);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print(lightValue);
  lcd.print("lx");

  lcd.setCursor(10, 1);
  lcd.print(earthMoisture);
  lcd.print("%");
}