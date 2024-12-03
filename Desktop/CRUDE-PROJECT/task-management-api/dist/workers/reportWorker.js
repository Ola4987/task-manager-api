"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// workers/reportWorker.ts
const worker_threads_1 = require("worker_threads");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Sample report generation function
const generateReport = (criteria) => {
    // Simulating report generation based on criteria
    const fileName = `report-${Date.now()}.txt`;
    const filePath = path_1.default.resolve(__dirname, "../generatedReports", fileName);
    const reportContent = `Report based on criteria: ${JSON.stringify(criteria)}`;
    // Write to a file
    fs_1.default.writeFileSync(filePath, reportContent);
    return filePath; // Returning the file path
};
// Generate the report
const filePath = generateReport(worker_threads_1.workerData.criteria);
// Send the file path back to the main thread
worker_threads_1.parentPort?.postMessage(filePath);
