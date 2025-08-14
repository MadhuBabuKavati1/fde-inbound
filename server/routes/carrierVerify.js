import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

// Verify carrier using FMCSA API
router.get("/", async (req, res) => {
    let { mc, dot } = req.query;
    if (!mc && !dot) {
        return res.status(400).json({ error: "MC or DOT required" });
    }

    const webKey = process.env.FMCSA_API_KEY;
    if (!webKey) {
        return res.status(500).json({ error: "FMCSA_API_KEY not set" });
    }

    try {
        // Clean MC number (remove "MC-" and leading zeros)
        if (mc) {
            mc = mc.replace(/^MC-?/i, "").replace(/^0+/, "");
        }

        const url = mc
            ? `https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/${encodeURIComponent(mc)}?webKey=${encodeURIComponent(webKey)}`
            : `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;

        const response = await fetch(url);
        const data = await response.json();

        // Check eligibility
        const carrier = data?.content?.carrier;
        const isEligible = carrier?.operatingStatus?.toLowerCase() === "active";

        res.json({
            eligible: isEligible,
            carrier: carrier || null,
            raw: data
        });
    } catch (error) {
        console.error("FMCSA API error:", error);
        res.status(500).json({ error: "FMCSA API request failed" });
    }
});

export default router;





/*
import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

// Verify carrier using FMCSA API
router.get("/", async (req, res) => {
    const { mc, dot } = req.query;
    if (!mc && !dot) return res.status(400).json({ error: "MC or DOT required" });

    const webKey = process.env.FMCSA_API_KEY;
    if (!webKey) return res.status(500).json({ error: "FMCSA_API_KEY not set" });

    try {
        const url = mc
            ? `https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/${encodeURIComponent(mc)}?webKey=${encodeURIComponent(webKey)}`
            : `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;

        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "FMCSA API request failed" });
    }
});

export default router;
*/