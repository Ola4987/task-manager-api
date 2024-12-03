"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.deleteTask = exports.patchTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
// Create a new task
const createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const newTask = await Task_1.default.create({
            title,
            description,
            status,
            priority,
            dueDate,
        });
        res
            .status(201)
            .json({ message: "Task created successfully", task: newTask });
    }
    catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};
exports.createTask = createTask;
// Get all tasks
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task_1.default.find(req.query); // Allow query parameters for filtering
        res.status(200).json({ tasks });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTasks = getAllTasks;
// Get a single task by ID
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return; // Explicit return to avoid further execution
        }
        res.status(200).json({ task });
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
// Update a task completely
const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Task updated successfully", task: updatedTask });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
// Partially update a task
const patchTask = async (req, res, next) => {
    try {
        const patchedTask = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!patchedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Task patched successfully", task: patchedTask });
    }
    catch (error) {
        next(error);
    }
};
exports.patchTask = patchTask;
// In your taskController.ts file
// Delete a task
const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await Task_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
// Generate a report using worker threads
const generateReport = async (req, res, next) => {
    try {
        const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, "../workers/reportWorker.js"), // Path to your TypeScript worker
        {
            workerData: { criteria: req.query }, // Pass query parameters as worker data
        });
        worker.on("message", (filePath) => {
            // Send the generated report to the cliennpx
            res.download(filePath, (err) => {
                if (err) {
                    return next(err);
                }
            });
        });
        worker.on("error", (error) => {
            next(error);
        });
        worker.on("exit", (code) => {
            if (code !== 0) {
                next(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateReport = generateReport;
// hi
