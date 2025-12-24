import express from "express";
import auth from "../middleware/auth.js";
import { uploadTask } from "../middleware/uploadTask.js";
import { createTask,getAllTasks,getTaskFeed,updateTask,deleteTask,searchFeedTasks,searchMyTasks} from "../controllers/taskController.js";

const router = express.Router();

router.get("/feed", auth, getTaskFeed);
router.post("/my", auth, uploadTask.single("picture"), createTask);
router.get("/my", auth, getAllTasks);
router.put("/my/:id", auth, uploadTask.single("picture"), updateTask);
router.delete("/my/:id", auth, deleteTask);
router.get("/search", auth, searchFeedTasks);
router.get("/my/search", auth, searchMyTasks);

export default router;
