import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: String, 
      required: true
    },
    type: {
      type: String,
      enum: [
        "TASK_REQUEST",
        "REQUEST_ACCEPTED",
        "REQUEST_REJECTED",
        "TASK_REMINDER"
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: {}
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
