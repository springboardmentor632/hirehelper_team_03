import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    requester: {
      type: String, // UUID from User schema
      ref: "User",
      required: true
    },
    taskOwner: {
      type: String, // UUID from User schema
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
