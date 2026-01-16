import express from "express";
import auth from "../middleware/auth.js";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", auth, getMyNotifications);
router.patch("/:id/read", auth, markAsRead);
router.patch("/read-all", auth, markAllAsRead); // 🔥 REQUIRED
// place specific path before parameterized ones so 'clear' isn't treated as an id
router.delete("/clear", auth, clearAllNotifications);
router.delete("/:id", auth, deleteNotification);

export default router;