import redisClient from "../cache/redisClient.js";
import fetchData from "../services/externalApiService.js";

const getData = async (req, res) => {
    try {
        const data = await fetchData();
        const cacheKey = req.originalUrl;

        // Cache response data with a 1-hour expiration
        await redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 });

        res.status(200).json(data);
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default getData;
