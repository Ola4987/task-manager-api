import fs from "fs";
import path from "path";

const reportsDir = path.resolve(__dirname, "../generatedReports");

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

export const getReportsDir = () => reportsDir;
