import { Task } from "../models/index.js";
import { createTaskSchema } from "../validators/taskValidator.js";

export const createTask = async (req, res) => {
  try {
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const taskData = {
      user_id: req.user.id,
      title: value.title,
      description: value.description,
      location: value.location,
      start_time: new Date(value.start_time),
      end_time: value.end_time ? new Date(value.end_time) : null,
      status: value.status || "pending",
    };

    if (req.file) {
      taskData.picture = `/uploads/tasks/${req.file.filename}`;
    }

    const task = await Task.create(taskData);
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, user_id: req.user.id },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      order: [["start_time", "ASC"]],
    });

    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const updates = req.body;

    if (req.file) {
      updates.picture = `/uploads/tasks/${req.file.filename}`;
    }

    if (updates.start_time) updates.start_time = new Date(updates.start_time);
    if (updates.end_time) updates.end_time = new Date(updates.end_time);

    await task.update(updates);

    return res.json({ message: "Task updated", task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, user_id: req.user.id },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();

    return res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
