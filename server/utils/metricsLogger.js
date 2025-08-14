import { readJSON, writeJSON } from "./fileDB.js";

const METRICS_FILE = "server/callLogs.json";

export function logMetric(entry) {
    const logs = readJSON(METRICS_FILE) || [];

    const newEntry = {
        timestamp: new Date().toISOString(),
        ...entry
    };

    logs.push(newEntry);
    writeJSON(METRICS_FILE, logs);
}

export function getMetrics() {
    const logs = readJSON(METRICS_FILE) || [];

    return {
        totalCalls: logs.length,
        acceptedCalls: logs.filter(l => l.outcome === "accepted").length,
        avgRate: logs.length
            ? (logs.reduce((sum, l) => sum + (l.agreedRate || 0), 0) / logs.length).toFixed(2)
            : 0,
        recentCalls: logs.slice(-10) // last 10 calls
    };
}
