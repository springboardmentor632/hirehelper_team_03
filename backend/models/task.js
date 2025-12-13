import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: String,
    location: {
      type: String,
      maxlength: 255,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: Date,
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    picture: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
