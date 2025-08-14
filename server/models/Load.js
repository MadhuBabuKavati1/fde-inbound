import mongoose from "mongoose";

const loadSchema = new mongoose.Schema({
    load_id: String,
    origin: String,
    destination: String,
    pickup_datetime: String,
    delivery_datetime: String,
    equipment_type: String,
    loadboard_rate: Number,
    notes: String,
    weight: Number,
    commodity_type: String,
    num_of_pieces: Number,
    miles: Number,
    dimensions: String
});

export default mongoose.model("Load", loadSchema);
