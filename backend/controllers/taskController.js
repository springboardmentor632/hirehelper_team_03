import Task from "../models/task.js";
import { uploadTaskToCloudinary } from "../middleware/uploadTask.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, location, start_time, end_time } = req.body;
    if (!title || !description || !location || !start_time) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }
    const data = {
      user_id: req.user.id,
      title,
      description,
      location,
      start_time: new Date(start_time),
      end_time: end_time ? new Date(end_time) : null,
    };
    if (req.file) {
      const result = await uploadTaskToCloudinary(req.file.buffer);
      data.picture = result.secure_url;
    }
    const task = await Task.create(data);
    return res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments({ user_id: req.user.id });

    const tasks = await Task.find({ user_id: req.user.id })
      .sort({ start_time: 1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: tasks.length ? "Tasks fetched successfully" : "No task found",
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTaskFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user_id: { $ne: req.user.id } };

    const totalTasks = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .sort({ start_time: 1 })
      .skip(skip)
      .limit(limit)
      .populate("user_id", "first_name last_name profile_picture");

    if (tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks available",
        tasks: [],
        pagination: {
          totalTasks,
          totalPages: 0,
          currentPage: page
        }
      });
    }

    return res.status(200).json({
      tasks,
      pagination: {
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page,
        limit
      }
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}


export const updateTask = async (req, res) => {
  try {
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

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const searchFeedTasks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const DEFAULT_LIMIT = 50;
    const MAX_LIMIT = 100;

    const page = Math.max(1, Number(req.query.page) || 1);
    let limit = Number(req.query.limit) || DEFAULT_LIMIT;
    limit = Math.min(limit, MAX_LIMIT);

    const skip = (page - 1) * limit;

    const tasks = await Task.find(
      {
        $text: { $search: query },
        user_id: { $ne: req.user.id }
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ tasks });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchMyTasks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const DEFAULT_LIMIT = 50;
    const MAX_LIMIT = 100;

    const page = Math.max(1, Number(req.query.page) || 1);
    let limit = Number(req.query.limit) || DEFAULT_LIMIT;
    limit = Math.min(limit, MAX_LIMIT);

    const skip = (page - 1) * limit;

    const tasks = await Task.find(
      {
        $text: { $search: query },
        user_id: req.user.id
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ tasks });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
