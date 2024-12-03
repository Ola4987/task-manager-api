import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateTask: RequestHandler[] = [
  body("title").notEmpty().withMessage("Title is required"),
  body("status")
    .isIn(["pending", "completed"])
    .withMessage('Invalid status. Allowed values: "pending" or "completed"'),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid dueDate format. Use ISO8601 format."),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
