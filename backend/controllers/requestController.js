import Request from "../models/requestModel.js";
import Task from "../models/task.js";

export const sendRequest = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user_id === req.user.id) {
      return res.status(400).json({ message: "Cannot request your own task" });
    }
    const existingRequest = await Request.findOne({
      task: taskId,
      requester: req.user.id
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    const request = await Request.create({
      task: taskId,
      requester: req.user.id,
      taskOwner: task.user_id
    });
    res.status(201).json({
      message: "Task request sent successfully",
      request
    });
  } catch (error) {
    console.error("Send Request Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      taskOwner: req.user.id
    })
      .populate("task")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.error("Get Received Requests Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      requester: req.user.id
    })
      .populate("task")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.taskOwner !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.taskOwner !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

