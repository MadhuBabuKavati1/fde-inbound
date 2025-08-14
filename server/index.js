// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import verifyRouter from "./routes/verify.js";
import classifyRouter from "./routes/classify.js";
import metricsRouter from "./routes/metrics.js";
import { readJSON } from "./utils/fileDB.js"; // ✅ For dashboard

// Load environment variables
dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/verify", verifyRouter);
app.use("/classify", classifyRouter);
app.use("/metrics", metricsRouter);

// Dashboard view
app.get("/dashboard", (req, res) => {
  const metrics = readJSON("server/metrics.json") || [];
  let html = `
    <h1>📊 AI Assistant Call Metrics</h1>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr>
        <th>Call ID</th>
        <th>MC</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Rate</th>
        <th>Outcome</th>
        <th>Sentiment</th>
        <th>Time</th>
      </tr>
  `;
  metrics.forEach(m => {
    html += `
      <tr>
        <td>${m.callId || "-"}</td>
        <td>${m.mc || "-"}</td>
        <td>${m.origin || "-"}</td>
        <td>${m.destination || "-"}</td>
        <td>${m.rate ? `$${m.rate}` : "-"}</td>
        <td>${m.outcome || "-"}</td>
        <td>${m.sentiment || "-"}</td>
        <td>${new Date(m.timestamp).toLocaleString()}</td>
      </tr>
    `;
  });
  html += "</table>";
  res.send(html);
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("FDE Inbound Agent Server is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});


/*
// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import verifyRouter from "./routes/verify.js";     // Mock or real verification
import classifyRouter from "./routes/classify.js"; // Transcript classification

// Load environment variables
dotenv.config();

const app = express(); // ✅ Initialize app first

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/verify", verifyRouter);     // This will now hit your mock verification
app.use("/classify", classifyRouter); // Classify call outcome & sentiment

// Health check
app.get("/", (req, res) => {
  res.send("🚀 FDE Inbound Agent Server is running");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
*/