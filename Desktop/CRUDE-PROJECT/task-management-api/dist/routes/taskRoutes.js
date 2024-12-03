"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskControllers_1 = require("../controllers/taskControllers");
const taskValidator_1 = require("../validators/taskValidator");
const taskControllers_2 = require("../controllers/taskControllers");
const router = (0, express_1.Router)();
// Create a new task
router.post("/", taskValidator_1.validateTask, taskControllers_1.createTask);
// Get all tasks
router.get("/", taskControllers_1.getAllTasks);
// Get a task by ID
router.get("/:id", taskControllers_1.getTaskById);
// Update a task completely
router.put("/:id", taskValidator_1.validateTask, taskControllers_1.updateTask);
// Partially update a task
router.patch("/:id", taskValidator_1.validateTask, taskControllers_1.patchTask);
// Delete a task
router.delete("/:id", taskControllers_1.deleteTask);
// Generate a report
router.get("/reports", taskControllers_2.generateReport);
exports.default = router;
