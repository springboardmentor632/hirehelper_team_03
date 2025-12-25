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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
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

taskSchema.index({
  title: "text",
  description: "text",
  location: "text",
});

export default mongoose.model("Task", taskSchema);
