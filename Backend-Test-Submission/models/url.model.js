import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    referrer: String,
    location: String,
});

const urlSchema = new mongoose.Schema({
    shortcode: { type: String, unique: true, required: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiry: { type: Date },
    clicks: [clickSchema],
});

export default mongoose.model("ShortUrl", urlSchema);
