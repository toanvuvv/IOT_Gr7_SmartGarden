import { DataEsp32 } from "../config/connectDB";

export const createData = async (message: any) => {
  try {
    const data = JSON.parse(message.toString());
    // Thêm các trường riêng lẻ vào Firestore
    await DataEsp32.add({
      from: data.from,
      temperature: data.temperature,
      humidity: data.humidity,
      lightValue: data.lightValue,
      earthMoisture: data.earthMoisture,
      createdAt: new Date().getTime(),
    });
    console.log({
      from: data.from,
      temperature: data.temperature,
      humidity: data.humidity,
      lightValue: data.lightValue,
      earthMoisture: data.earthMoisture,
      createdAt: new Date().getTime(),
    });
    console.log("Data added to Firestore successfully!");
  } catch (error) {
    console.error("Error processing message:", error);
  }
};
