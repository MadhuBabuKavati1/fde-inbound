// src/routes/verify.js
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { mc, dot } = req.query || {};

  if (!mc && !dot) {
    return res.status(400).json({ 
      success: false, 
      error: "mc or dot required" 
    });
  }

  // 🚀 FMCSA verification skipped for testing
  return res.json({
    success: true,
    input: { mc, dot },
    eligible: true, // Always allow for now
    carrierData: {
      mc: mc || null,
      dot: dot || null,
      note: "FMCSA verification skipped for testing"
    },
    error: null
  });
});

export default router;
