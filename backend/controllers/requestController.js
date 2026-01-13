import Request from "../models/requestModel.js";
import Task from "../models/task.js";
import { createNotification } from "../utils/notificationService.js";

/* SEND REQUEST */
export const sendRequest = async (req, res) => {
  try {
    const { taskId, text } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user_id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot request your own task" });
    }

    const existing = await Request.findOne({
      task: taskId,
      requester: req.user.id
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await Request.create({
      task: taskId,
      requester: req.user.id,
      taskOwner: task.user_id,
      text
    });

    res.status(201).json({ message: "Task request sent", request });

    await createNotification(
      task.user_id.toString(),
      "TASK_REQUEST",
      "New Task Request",
      "Someone has requested your task",
      { taskId, requesterId: req.user.id }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET RECEIVED REQUESTS */
export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ taskOwner: req.user.id })
      .populate("task")
      .populate("requester", "first_name last_name")
      .sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET SENT REQUESTS */
export const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id })
      .populate("task")
      .populate("taskOwner", "first_name last_name")
      .sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ACCEPT REQUEST */
export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.taskOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "accepted";
    await request.save();

    const updated = await Request.findById(request._id).populate("task");

    res.status(200).json({ message: "Request accepted", request: updated });
    // Log and create notification for the requester
    try {
      console.log('Creating REQUEST_ACCEPTED notification for user', request.requester?.toString(), { taskTitle: updated?.task?.title, taskId: updated?.task?._id, requestId: request._id });
      await createNotification(
        request.requester.toString(),
        "REQUEST_ACCEPTED",
        "Request Accepted 🎉",
        `Your request for "${updated.task.title}" was accepted`,
        { taskId: updated.task._id, requestId: request._id }
      );
    } catch (notifErr) {
      console.error('Error creating accept notification:', notifErr);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* REJECT REQUEST */
export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.taskOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "rejected";
    await request.save();

    const updated = await Request.findById(request._id).populate("task");

    // Log and create notification for the requester
    try {
      console.log('Creating REQUEST_REJECTED notification for user', request.requester?.toString(), { taskTitle: updated?.task?.title, taskId: updated?.task?._id, requestId: request._id });
      await createNotification(
        request.requester.toString(),
        "REQUEST_REJECTED",
        "Request Rejected",
        `Your request for "${updated.task?.title || 'task'}" was rejected`,
        { taskId: updated.task?._id, requestId: request._id }
      );
    } catch (notifErr) {
      console.error('Error creating reject notification:', notifErr);
    }

    res.status(200).json({ message: "Request rejected", request: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE REQUEST */
export const deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { taskOwner: req.user.id },
        { requester: req.user.id }
      ]
    });

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
