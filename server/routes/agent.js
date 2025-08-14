// server/routes/agent.js
import fetch from "node-fetch";

export async function logMetrics(data) {
  try {
    const res = await fetch("http://localhost:5050/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.error("❌ Failed to log metrics:", await res.text());
    } else {
      console.log("✅ Metrics logged successfully");
    }
  } catch (err) {
    console.error("❌ Error logging metrics:", err.message);
  }
}
