import ShortUrl from "../models/url.model.js";
import crypto from "crypto";

export const generateShortcode = async () => {
    let code;
    let exists = true;
    while (exists) {
        code = crypto.randomBytes(3).toString("hex");
        exists = await ShortUrl.findOne({ shortcode: code });
    }
    return code;
};

