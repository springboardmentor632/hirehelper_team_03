import express from "express";
import {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest
} from "../controllers/requestController.js";
import  protect  from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, sendRequest);
router.get("/received", protect, getReceivedRequests);
router.get("/sent", protect, getSentRequests);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);
router.delete("/:id", protect, deleteRequest);

export default router;
