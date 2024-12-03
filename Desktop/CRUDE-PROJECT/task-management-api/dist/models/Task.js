"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Mongoose schema
const TaskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        set: (v) => v.toLowerCase(), // This will store the status in lowercase
    },
    createdAt: { type: Date, default: Date.now },
});
// Create the model
const Task = mongoose_1.default.model("Task", TaskSchema);
exports.default = Task;
