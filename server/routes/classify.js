// server/routes/classify.js
import { Router } from "express";

const router = Router();

// Simple classification logic
function classifyTranscript(transcriptText) {
  let outcome = "Unknown";
  let sentiment = "Neutral";

  const text = transcriptText.toLowerCase();

  // Outcome classification example
  if (
    text.includes("book a load") ||
    text.includes("pick up") ||
    text.includes("delivery") ||
    text.includes("booked") ||                 // Added
    text.includes("regular load")              // Added
  ) {
    outcome = "Booked";                         // Changed from "Eligible" to "Booked"
  } else if (text.includes("not available") || text.includes("cancel")) {
    outcome = "Not Eligible";
  }

  // Sentiment classification example
  if (text.includes("thank you") || text.includes("great")) {
    sentiment = "Positive";
  } else if (text.includes("angry") || text.includes("frustrated") || text.includes("bad")) {
    sentiment = "Negative";
  }

  return { outcome, sentiment };
}

// POST endpoint
router.post("/", (req, res) => {
  try {
    const { transcript, outcome: providedOutcome } = req.body;

    if (!transcript || transcript.trim() === "") {
      return res.status(400).json({ error: "Transcript is required" });
    }

    // If outcome is provided in the request, use it directly
    if (providedOutcome && providedOutcome.trim() !== "") {
      return res.json({ outcome: providedOutcome, sentiment: "Neutral" });
    }

    // Otherwise, classify based on transcript text
    const { outcome, sentiment } = classifyTranscript(transcript);

    return res.json({ outcome, sentiment });
  } catch (err) {
    console.error("Classification error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
