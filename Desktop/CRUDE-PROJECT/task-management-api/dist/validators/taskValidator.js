"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware for task
exports.validateTask = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("status")
        .isIn(["pending", "completed"])
        .withMessage('Invalid status. Allowed values: "pending" or "completed"'),
    (0, express_validator_1.body)("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid dueDate format. Use ISO8601 format."),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.status(400).json({ errors: errors.array() });
            return; // Ensure the function always returns void
        }
        next(); // Call next middleware
    },
];
