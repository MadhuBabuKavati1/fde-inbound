import { Router } from "express";
import { appendJSON, readJSON } from "../utils/fileDB.js";

const router = Router();

// POST - Save metrics
router.post("/", (req, res) => {
  const { callId, mc, origin, destination, equipmentType, pickupDateTime, rate, outcome, sentiment } = req.body;

  if (!callId) {
    return res.status(400).json({ success: false, message: "callId is required" });
  }

  const record = {
    callId,
    mc: mc || "",
    origin: origin || "",
    destination: destination || "",
    equipmentType: equipmentType || "",
    pickupDateTime: pickupDateTime || "",
    rate: rate || "",
    outcome: outcome || "",
    sentiment: sentiment || "",
    timestamp: new Date().toISOString()
  };

  appendJSON("server/metrics.json", record);

  res.json({ success: true, message: "Metrics saved", record });
});

// GET - Return metrics
router.get("/", (req, res) => {
  const metrics = readJSON("server/metrics.json") || [];
  res.json(metrics);
});

export default router;
