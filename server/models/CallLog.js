import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
    transcript: String,
    outcome: String,
    sentiment: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("CallLog", callLogSchema);
