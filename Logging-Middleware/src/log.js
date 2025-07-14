import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOGGING_API = "http://20.244.56.144/evaluation-service/logs";

/**
 * @param {"backend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {"auth"|"config"|"middleware"|"utils"|"cache"|"controller"|"cron_job"|"db"|"domain"|"handler"|"repository"|"route"|"service"} pkg
 * @param {string} message
 */
export const log = async (stack, level, pkg, message) => {
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
                    Authorization: `Bearer ${process.env.LOGGING_AUTH_TOKEN}`,
                },
            }
        );

        if (response.status === 200) {
            console.log(`[LOG SUCCESS]: ${level.toUpperCase()} - ${pkg} - ${message}`);
        }
    } catch (error) {
        console.error("[LOGGING FAILED]:", error.message);
    }
};
