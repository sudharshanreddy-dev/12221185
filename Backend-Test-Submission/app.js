// app.js
import express from "express";
import router from "./routes/url.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { log } from "../logging-middleware/src/log.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/", router);

// Optional health check route
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

export const initLog = async () => {
    try {
        await log("backend", "info", "controller", "Initial log test after app starts");
        console.log("Initial log test after app starts");
    } catch (err) {
        console.error("Failed to send initial log:", err.message);
    }
};

export default app;
