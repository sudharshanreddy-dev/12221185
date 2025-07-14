import{log} from "../../Logging-Middleware/src/log.js";

export const requestLogger = async (req, res, next) => {
    await log("backend", "debug", "middleware", `accessing url`);
    next();
};
