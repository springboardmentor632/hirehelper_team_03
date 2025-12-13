
import express from "express";
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,     
} from "../controllers/taskController.js";

import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/", auth, upload.single("picture"), createTask);

router.get("/", auth, getAllTasks);

router.get("/:id", auth, getTaskById);

router.put("/:id", auth, upload.single("picture"), updateTask);

router.delete("/:id", auth, deleteTask);

export default router;
