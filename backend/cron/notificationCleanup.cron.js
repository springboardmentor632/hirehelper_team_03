import cron from "node-cron";
import Notification from "../models/notification.js";

cron.schedule("0 2 * * *", async () => {
  try {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() - THIRTY_DAYS);

    const result = await Notification.deleteMany({
      createdAt: { $lt: expiryDate }
    });

    console.log(`🧹 Deleted ${result.deletedCount} old notifications`);
  } catch (error) {
    console.error("Notification Cleanup Cron Error:", error);
  }
});
