// workers/reportWorker.ts
import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import path from "path";

const generateReport = (criteria: any) => {
  try {
    const reportDir = path.resolve(__dirname, "../generatedReports");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
      console.log(`Created directory: ${reportDir}`);
    }

    const fileName = `report-${Date.now()}.txt`;
    const filePath = path.resolve(reportDir, fileName);
    const reportContent = `Report based on criteria: ${JSON.stringify(criteria)}`;

    fs.writeFileSync(filePath, reportContent);
    console.log(`Report generated at: ${filePath}`);

    return filePath;
  } catch (error) {
    console.error("Error during report generation:", error);
    throw new Error("Failed to generate report");
  }
};

try {
  const filePath = generateReport(workerData.criteria);
  console.log(`Sending file path to parent thread: ${filePath}`);

  if (parentPort) {
    parentPort.postMessage(filePath);
  }
} catch (error) {
  console.error("Worker failed:", error);
  if (parentPort) {
    parentPort.postMessage("Failed to generate report");
  }
}
