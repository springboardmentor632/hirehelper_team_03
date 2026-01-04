import express from "express";
import {
  getMyNotifications,
  markAsRead,
  clearAllNotifications
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);
router.patch("/:id/read", authMiddleware, markAsRead);
router.delete("/clear", authMiddleware, clearAllNotifications);

export default router;
