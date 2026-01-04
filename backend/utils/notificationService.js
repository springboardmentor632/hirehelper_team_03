import Notification from "../models/notification.js";

export const createNotification = async (
  user,
  type,
  title,
  message,
  data = {}
) => {
  return await Notification.create({
    user,
    type,
    title,
    message,
    data
  });
};
