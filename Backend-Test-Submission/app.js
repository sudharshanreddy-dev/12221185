import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/url.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use("/", router);

export default app;
