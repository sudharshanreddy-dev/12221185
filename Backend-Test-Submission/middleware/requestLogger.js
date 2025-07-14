import { log } from "../../logging-middleware/src/log.js";

export const requestLogger = async (req, res, next) => {
    await log("backend", "debug", "middleware", `${req.method} ${req.url}`);
    next();
};
