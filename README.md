# Smart Garden System

This project is an IoT-based Smart Garden System using ESP32. It monitors and controls garden parameters such as temperature, humidity, light, and soil moisture.

## Hardware Requirements

- ESP32
- DHT11 Sensor (Temperature and Humidity)
- BH1750 Sensor (Light Intensity)
- Soil Moisture Sensor
- Relay Module
- LED
- LiquidCrystal_I2C (LCD Display)
- Breadboard and Jumper Wires

## Software Requirements

- Arduino IDE
- Libraries:
  - Wire.h
  - DHT.h
  - BH1750.h
  - LiquidCrystal_I2C.h
  - WiFi.h
  - PubSubClient.h
  - ArduinoJson.h

## Setup

1. **Install Arduino IDE:**
   Download and install the Arduino IDE from the [official website](https://www.arduino.cc/en/software).

2. **Install Libraries:**
   Open Arduino IDE, go to `Sketch` > `Include Library` > `Manage Libraries...`. Search for and install the following libraries:
   - DHT sensor library
   - BH1750
   - LiquidCrystal I2C
   - PubSubClient
   - ArduinoJson

3. **Hardware Connections:**
   Connect the sensors and modules to the ESP32 according to the pin configurations defined in the code.

4. **WiFi and MQTT Configuration:**
   Update the following variables in the code with your WiFi and MQTT broker credentials:
   ```cpp
   const char* ssid = "your_wifi_ssid";
   const char* password = "your_wifi_password";
   const char* mqtt_server = "your_mqtt_broker_address";
   ```
5. **Upload the Code:**
Connect your ESP32 to your computer, select the correct board and port in the Arduino IDE, and upload the code.
6. **MQTT Broker:**
Ensure that your MQTT broker is running and properly configured to receive and send messages to/from your ESP32.
## Running
Once the code is uploaded and your ESP32 is powered on, it will automatically connect to the configured WiFi network and MQTT broker. It will start sending sensor data to the MQTT topic and listen for control messages to turn on/off the LED and pump.

You can monitor the sensor data and control the LED and pump through your MQTT broker's interface or any MQTT client application.
## Troubleshooting
Ensure all the libraries are correctly installed.
Check the hardware connections.
Verify the WiFi SSID, password, and MQTT broker details.
Open the Serial Monitor in the Arduino IDE to debug and check for any connection issues or errors.
# Installation & Running the Website

## Prerequisites

- Node.js and npm (Node Package Manager) installed.
- A MQTT broker if you want to handle real-time IoT data.

## Steps

### Clone the repository

```sh
git clone https://github.com/toanvuvv/IOT_Gr7_SmartGarden.git
cd IOT_Gr7_SmartGarden
```
## Set up and run the server

### Navigate to the server directory and Install the dependencies
```sh
cd server
npm install
or
yarn install
```
### Start the server 
```sh
npm run dev 
```
## Set up and run the client

### Navigate to the client directory and Install the dependencies
```sh
cd server
npm install
or
yarn install
```
### Start the client application
```sh
npm run dev 
```
## Access the application
Once both the server and client are running, you can access the client application in your browser at http://localhost:3000.

