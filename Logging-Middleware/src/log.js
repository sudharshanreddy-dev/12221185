import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOGGING_API = "http://20.244.56.144/evaluation-service/logs";

console.log("Token being used:", process.env.LOGGING_AUTH_TOKEN);


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
                   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWRoYXJzaGFuMTAxMDEwMTBAZ21haWwuY29tIiwiZXhwIjoxNzUyNDc0NzY0LCJpYXQiOjE3NTI0NzM4NjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3ZWJhZjI3NS0xOTYzLTQyMDEtYTc1MC0zNGVkYTYwZWM1YTEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrb3Z2dXJpIHN1ZGhhcnNoYW4gcmVkZHkiLCJzdWIiOiJhY2E4ZDcxZi0xZjU1LTQ5NjktOTZjNy0zMmJlMDkwYzU2ODIifSwiZW1haWwiOiJzdWRoYXJzaGFuMTAxMDEwMTBAZ21haWwuY29tIiwibmFtZSI6ImtvdnZ1cmkgc3VkaGFyc2hhbiByZWRkeSIsInJvbGxObyI6IjEyMjIxMTg1IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiYWNhOGQ3MWYtMWY1NS00OTY5LTk2YzctMzJiZTA5MGM1NjgyIiwiY2xpZW50U2VjcmV0IjoiWk5ua256ZUpYVndwZmdiYyJ9.G7Q7YReTqSGW1hEwUkKd85_29AK5w6PHichO08MdVIU`,
                    "Content-Type": "application/json"
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
