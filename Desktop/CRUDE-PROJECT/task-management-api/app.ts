import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { Worker } from "worker_threads";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();
// Initialize Express
const app = express();

// Middleware for parsing JSON
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/tasks", taskRoutes);

app.use("/report", taskRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", (error as Error).message);
    process.exit(1);
  }
};

connectDB();

// Utility function to run the worker
const runReportWorker = (criteria: any) => {
  return new Promise<string>((resolve, reject) => {
    console.log("Running worker to generate the report...");
    const worker = new Worker(
      path.resolve(__dirname, "./workers/reportWorker.js"),
      {
        workerData: { criteria },
      }
    );

    worker.on("message", (filePath) => {
      console.log("Worker finished. File generated at:", filePath);
      resolve(filePath); // When the worker sends the file path, resolve it
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
      reject(err); // Handle worker error
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      } else {
        console.log("Worker exited successfully");
      }
    });
  });
};

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Task Management API is running");
});

// Route to generate report
app.get("/reports", async (req: Request, res: Response) => {
  try {
    const criteria = {
      // Example criteria, you can fetch these from query params or request body
      type: "monthly",
      date: "2024-12-01",
    };

    // Call the worker to generate the report
    const reportPath = await runReportWorker(criteria);

    // Send the generated report file as a response
    res.download(reportPath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error generating or sending report");
      } else {
        // Optionally clean up the file after sending it
        fs.unlinkSync(reportPath); // Delete the report file after sending it
      }
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).send("Failed to generate report");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
