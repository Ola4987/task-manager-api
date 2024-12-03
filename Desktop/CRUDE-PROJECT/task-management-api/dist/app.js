"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express
const app = (0, express_1.default)();
// Middleware for parsing JSON
app.use(express_1.default.json());
app.use("/api/tasks", taskRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/report", taskRoutes_1.default);
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || "");
        console.log("Connected to MongoDB Atlas");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
connectDB();
// Basic route
app.get("/", (req, res) => {
    res.send("Task Management API is running");
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
