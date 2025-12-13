import Task from "../models/task.js";
import { uploadTaskToCloudinary } from "../middleware/uploadTask.js";

export const createTask = async (req, res) => {
  try {
    const data = {
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      start_time: new Date(req.body.start_time),
      end_time: req.body.end_time ? new Date(req.body.end_time) : null,
    };

    if (req.file) {
      const result = await uploadTaskToCloudinary(req.file.buffer);
      data.picture = result.secure_url;
    }

    const task = await Task.create(data);
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id }).sort({ start_time: 1 });
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const updates = req.body;

  if (req.file) {
    const result = await uploadTaskToCloudinary(req.file.buffer);
    updates.picture = result.secure_url;
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user.id },
    updates,
    { new: true }
  );

  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted" });
};
