import express from "express";
import {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest
} from "../controllers/requestController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, sendRequest);
router.get("/received", auth, getReceivedRequests);
router.get("/sent", auth, getSentRequests);
router.put("/:id/accept", auth, acceptRequest);
router.put("/:id/reject", auth, rejectRequest);
router.delete("/:id", auth, deleteRequest);

export default router;
