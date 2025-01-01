import redisClient from "./redisClient.js";

const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;
    console.log("cache key: ", cacheKey);
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("Cache hit");
            return res.status(200).json(JSON.parse(cachedData));
        }
        console.log("Cache miss");
        next();
    } catch (error) {
        console.error("Cache middleware error:", error);
        next();
    }
};

export default cacheMiddleware;
