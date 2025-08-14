import { Router } from "express";
import { readJSON } from "../utils/fileDB.js";
import { logMetrics } from "./agent.js"; // Import the new logging helper

const router = Router();

router.post("/", async (req, res) => {
    const { load_id, offer, mcNumber } = req.body; // Added mcNumber for metrics
    if (!load_id || !offer) {
        return res.status(400).json({ error: "Missing load_id or offer" });
    }

    const loads = readJSON("server/loadData.json");
    const load = loads.find(l => l.load_id === load_id);

    if (!load) {
        return res.status(404).json({ error: "Load not found" });
    }

    let counter = load.loadboard_rate;
    let outcome;
    let finalPrice;

    if (offer >= counter * 0.95) {
        outcome = "accepted";
        finalPrice = offer;
        res.json({ accepted: true, final_price: offer });
    } else {
        outcome = "countered";
        finalPrice = counter * 0.98;
        res.json({ accepted: false, counter_offer: finalPrice });
    }

    // Log metrics after sending the response
    await logMetrics({
        callId: Date.now().toString(), // replace with actual call ID if available
        mcNumber,
        load_id,
        origin: load.origin,
        destination: load.destination,
        pickupDate: load.pickup_datetime,
        deliveryDate: load.delivery_datetime,
        equipmentType: load.equipment_type,
        agreedRate: finalPrice,
        outcome
    });
});

export default router;
