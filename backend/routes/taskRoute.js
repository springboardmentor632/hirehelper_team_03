import express from "express";
import auth from "../middleware/auth.js";
import { uploadTask } from "../middleware/uploadTask.js";
import { createTask,getAllTasks,getTaskById,updateTask,deleteTask} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", auth, uploadTask.single("picture"), createTask);
router.get("/", auth, getAllTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, uploadTask.single("picture"), updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
