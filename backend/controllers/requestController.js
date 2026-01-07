import Request from "../models/requestModel.js";
import Task from "../models/task.js";
import { createNotification } from "../utils/notificationService.js";


export const sendRequest = async (req, res) => {
  try {
    const { taskId,text} = req.body;

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
      taskOwner: task.user_id,
      text: text
    });
    res.status(201).json({
      message: "Task request sent successfully",
      request
    });
    await createNotification(
      task.user_id,
      "TASK_REQUEST",
      "New Task Request",
      "Someone has requested your task",
      {
        taskId: taskId,
        requesterId: req.user.id
      }
    );
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
      .populate("requester", "first_name last_name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
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
      .populate("taskOwner", "first_name last_name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
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

    if (request.taskOwner?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "accepted";
    await request.save();

    const updated = await Request.findById(request._id)
      .populate("task")
      .populate("requester", "first_name last_name")
      .populate("taskOwner", "first_name last_name");

    res.status(200).json({ message: "Request accepted", request: updated });
    await createNotification(
      request.requester,
      "REQUEST_ACCEPTED",
      "Request Accepted 🎉",
      "Your request has been accepted",
      {
        taskId: request.task,
        requestId: request._id
      }
    );

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

    if (request.taskOwner?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "rejected";
    await request.save();

    await createNotification(
      request.requester,
      "REQUEST_REJECTED",
      "Request Rejected",
      "Your request has been rejected",
      {
        taskId: request.task,
        requestId: request._id
      }
    );

    return res.status(200).json({ message: "Request rejected" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a request (task owner or requester can delete)
export const deleteRequest = async (req, res) => {
  try {
    // Allow delete if the authenticated user is either the taskOwner or the requester
    const deleted = await Request.findOneAndDelete({ _id: req.params.id, $or: [{ taskOwner: req.user.id }, { requester: req.user.id }] });

    if (deleted) {
      console.log(`Deleted request ${req.params.id} by user ${req.user.id}`);
      return res.status(200).json({ message: "Request deleted", id: req.params.id });
    }

    const exists = await Request.findById(req.params.id);
    if (!exists) {
      console.log(`Delete failed: request ${req.params.id} not found`);
      return res.status(404).json({ message: "Request not found" });
    }

    console.log(`Delete forbidden: user ${req.user.id} not authorized for request ${req.params.id}`, 'taskOwner:', exists.taskOwner, 'requester:', exists.requester);
    return res.status(403).json({ message: "Not authorized" });
  } catch (error) {
    console.error("Delete Request Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

