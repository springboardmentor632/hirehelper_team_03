import Notification from "../models/notification.js";

export const createNotification = async (
  userId,
  type,
  title,
  message,
  data = {}
) => {
  try {
    if (!userId) {
      console.warn('createNotification called without userId', { type, title, message, data });
      return;
    }

    console.log('Creating notification', { userId: userId.toString(), type, title, message, data });

    const created = await Notification.create({
      user: userId.toString(), // ensure string
      type,
      title,
      message,
      data,
      isRead: false
    });

    console.log('Notification created:', created._id?.toString());
    return created;
  } catch (error) {
    console.error("Create Notification Error:", error);
    throw error;
  }
};