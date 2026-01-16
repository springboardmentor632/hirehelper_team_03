import Notification from "../models/notification.js";

/* GET ALL */
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

   res.status(200).json({ notifications });
  } catch (err) {
    console.error('getMyNotifications error:', err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/* MARK ONE AS READ */
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ notification });
  } catch (err) {
    console.error('markAsRead error:', err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/* 🔥 MARK ALL AS READ (IMPORTANT FIX) */
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error('markAllAsRead error:', err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/* DELETE ONE */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error('deleteNotification error:', err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/* CLEAR ALL */
export const clearAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user.id });
    res.status(200).json({ message: "Cleared" });
  } catch (err) {
    console.error('clearAllNotifications error:', err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
};