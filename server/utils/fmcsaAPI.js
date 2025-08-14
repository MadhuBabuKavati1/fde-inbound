import fetch from "node-fetch";

export async function verifyCarrier(mc, dot) {
    const webKey = process.env.FMCSA_API_KEY;
    if (!webKey) throw new Error("FMCSA_API_KEY not set");

    const url = mc
        ? `https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/${encodeURIComponent(mc)}?webKey=${encodeURIComponent(webKey)}`
        : `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`FMCSA API error: ${res.statusText}`);
    return res.json();
}
