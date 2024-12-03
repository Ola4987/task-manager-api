// workers/reportWorker.js
const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");
const path = require("path");

// Sample report generation function
const generateReport = (criteria) => {
  const fileName = `report-${Date.now()}.txt`;
  const filePath = path.resolve(__dirname, "../generatedReports", fileName);
  const reportContent = `Report based on criteria: ${JSON.stringify(criteria)}`;

  // Write the content to a file
  fs.writeFileSync(filePath, reportContent);
  return filePath; // Returning the file path
};

// Generate the report based on worker data
const filePath = generateReport(workerData.criteria);

// Send the file path back to the main thread
parentPort?.postMessage(filePath);
