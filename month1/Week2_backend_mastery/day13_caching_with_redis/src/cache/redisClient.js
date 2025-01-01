import { createClient } from "redis";

// Create a redis Client
console.log(process.env.REDIS_URL);
const redisClient = createClient({
    url: process.env.REDIS_URL,
});

// On Success
redisClient.on("connect", () => {
    console.log("Connected To Redis");
});

// On Error
redisClient.on("error", (err) => {
    console.error("Redis Connection Error", err);
});

(async () => {
    await redisClient.connect();
})();

export default redisClient;
