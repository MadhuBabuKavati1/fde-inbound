import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure we store metrics.json inside the server folder (one level up from utils)
const baseDir = path.join(__dirname, "..");

export function readJSON(filePath) {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) return [];
  return JSON.parse(fs.readFileSync(fullPath, "utf8") || "[]");
}

export function writeJSON(filePath, data) {
  const fullPath = path.join(baseDir, filePath);
  // ✅ Auto-create directory if missing
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

export function appendJSON(filePath, newData) {
  const data = readJSON(filePath);
  data.push(newData);
  writeJSON(filePath, data);
}
