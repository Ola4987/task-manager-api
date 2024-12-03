import { Request, Response, NextFunction, RequestHandler } from "express";
import Task from "../models/Task";
import { Worker } from "worker_threads";
import path from "path";

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await Task.find(req.query); // Allow query parameters for filtering
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return; // Explicit return to avoid further execution
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const patchTask: RequestHandler = async (req, res, next) => {
  try {
    const patchedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patchedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Task patched successfully", task: patchedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const generateReport: RequestHandler = async (req, res, next) => {
  try {
    const worker = new Worker(
      path.resolve(__dirname, "../workers/reportWorker.js"), // Path to your TypeScript worker
      {
        workerData: { criteria: req.query }, // Pass query parameters as worker data
      }
    );

    worker.on("message", (filePath) => {
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
  } catch (error) {
    next(error);
  }
};
