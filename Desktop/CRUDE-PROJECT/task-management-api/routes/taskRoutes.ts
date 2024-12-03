import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask,
} from "../controllers/taskControllers";
import { validateTask } from "../validators/taskValidator";
import { generateReport } from "../controllers/taskControllers";

const router = Router();

router.post("/", validateTask, createTask);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.put("/:id", validateTask, updateTask);

router.patch("/:id", validateTask, patchTask);

router.delete("/:id", deleteTask);

router.get("/reports", generateReport);

export default router;
