import mqtt from "mqtt";
import { getIPAddress } from "./func";

const brokerUrl = `mqtt://${getIPAddress()}`;
const topic = "control";
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  const data = {
    name: "nghia",
    ledMode: 1,
    pumpMode: 0,
    ledAutoMode: 0,
    pumpAutoMode: 0,
  };
  const message = JSON.stringify(data);

  client.publish(topic, message);
  console.log(`Published to ${topic}: ${message}`);
});
