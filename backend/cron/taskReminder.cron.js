import cron from "node-cron";
import Task from "../models/task.js";
import Notification from "../models/notification.js";

cron.schedule("*/10 * * * *", async () => {
  try {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await Task.find({
      start_time: { $gte: now, $lte: oneHourLater }
    });

    for (const task of tasks) {
      await Notification.create({
        user: task.user_id,
        type: "TASK_REMINDER",
        title: "⏰ Task Reminder",
        message: `Your task "${task.title}" starts within 1 hour`,
        data: { taskId: task._id }
      });
    }

    if (tasks.length) {
      console.log(`🔔 Sent ${tasks.length} reminders`);
    }
  } catch (error) {
    console.error("Task Reminder Cron Error:", error);
  }
});
