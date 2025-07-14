import ShortUrl from "../models/url.model.js";
import { urlSchema } from "../validators/url.validator.js";
import { generateShortcode } from "../services/url.service.js";
import {log} from "../../Logging-Middleware/src/log.js";

export const createShortUrl = async (req, res) => {
    try {
        const parsed = urlSchema.parse(req.body);
        const { url, validity = 30, shortcode } = parsed;

        let code = shortcode || await generateShortcode();

        const exists = await ShortUrl.findOne({ shortcode: code });
        if (exists) {
            await log("backend", "error", "handler", "Shortcode already in use.");
            return res.status(409).json({ error: "Shortcode already exists" });
        }

        const expiry = new Date(Date.now() + validity * 60 * 1000);

        const doc = await ShortUrl.create({
            shortcode: code,
            originalUrl: url,
            expiry,
        });

        await log("backend", "info", "controller", `Short URL created`);
        res.status(201).json({
            shortLink: `${req.protocol}://${req.get("host")}/${code}`,
            expiry: expiry.toISOString(),
        });
    } catch (err) {
        await log("backend", "error", "handler", err.message);
        res.status(400).json({ error: err.message });
    }
};

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortcode } = req.params;
        const record = await ShortUrl.findOne({ shortcode });

        if (!record) {
            await log("backend", "warn", "controller", `Shortcode not found`);
            return res.status(404).json({ error: "Shortcode not found" });
        }

        if (new Date() > record.expiry) {
            await log("backend", "warn", "controller", `Expired shortcode`);
            return res.status(410).json({ error: "Shortcode expired" });
        }

        // Track click
        record.clicks.push({
            referrer: req.get("referer") || "direct",
        });
        await record.save();

        await log("backend", "info", "handler", `Redirected`);
        res.redirect(record.originalUrl);
    } catch (err) {
        await log("backend", "error", "handler", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getUrlStats = async (req, res) => {
    try {
        const { shortcode } = req.params;
        const record = await ShortUrl.findOne({ shortcode });

        if (!record) {
            await log("backend", "warn", "controller", `Stats requested for missing shortcode`);
            return res.status(404).json({ error: "Shortcode not found" });
        }

        const { originalUrl, createdAt, expiry, clicks } = record;
        await log("backend", "info", "controller", `Stats retrieved for shortcode`);
        res.json({
            shortcode,
            originalUrl,
            createdAt,
            expiry,
            totalClicks: clicks.length,
            clickDetails: clicks,
        });
    } catch (err) {
        await log("backend", "error", "handler", err.message);
        res.status(500).json({ error: "Server error" });
    }
};
