import mongoose, { Schema, Document, Model } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: Date;
}

const TaskSchema: Schema<ITask> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
    set: (v: string) => v.toLowerCase(), // This will store the status in lowercase
  },
  createdAt: { type: Date, default: Date.now },
});

const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
