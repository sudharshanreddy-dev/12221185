import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const LOGGING_API = "http://20.244.56.144/evaluation-service/logs";


export const log = async (stack, level, pkg, message) => {
    const token = process.env.LOGGING_AUTH_TOKEN;

    if (!token) {
        console.error("LOGGING_AUTH_TOKEN is missing.");
        return;
    }

    try {
        const response = await axios.post(
            LOGGING_API,
            {
                stack,
                level,
                package: pkg,
                message,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            console.log(`[LOG SUCCESS]: ${level.toUpperCase()} - ${pkg} - ${message}`);
        }
    } catch (error) {
        console.error("[LOGGING FAILED]:", error.response?.data || error.message);
    }
};
