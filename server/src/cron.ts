const cron = require("node-cron");
import { DataEsp32, control, history, user, schedule } from "./config/connectDB";

cron.schedule("* * * * *", async () => {
  try {
    const oneMinuteAgo = Date.now() - 60000;
    const snapshot = await DataEsp32.where("createdAt", ">=", oneMinuteAgo).get();
    const data = snapshot.docs.map((doc: any) => doc.data());

    if (data.length > 0) {
      const avgLightValue = data.reduce((total: number, value: any) => total + value.lightValue, 0) / data.length;
      const avgTemperature = data.reduce((total: number, value: any) => total + value.temperature, 0) / data.length;
      const avgHumidity = data.reduce((total: number, value: any) => total + value.humidity, 0) / data.length;
      const avgEarthMoisture = data.reduce((total: number, value: any) => total + value.earthMoisture, 0) / data.length;

      const scheduleData = {
        avgLightValue,
        avgTemperature,
        avgHumidity,
        avgEarthMoisture,
        createdAt: Date.now(),
      };

      await schedule.add(scheduleData);
      console.log("Average data saved to schedule collection");
    } else {
      console.log("No data available from the last minute");
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});
