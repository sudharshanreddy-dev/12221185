// server.js
import dotenv from "dotenv";
import app, { initLog } from "./app.js";
import connectDB from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await initLog();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Server failed to start:", err.message);
    }
};

startServer();
