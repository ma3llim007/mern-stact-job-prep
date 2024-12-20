import Redis from "ioredis";

const redis = new Redis();

const throttleMiddleware = async (req, res, next) => {
    const userKey = `user:${req.ip}`;
    console.log(userKey);
    const maxRequest = 5;
    const windowTime = 60;

    const currentRequests = await redis.incr(userKey);

    if (currentRequests === 1) {
        redis.expire(userKey, windowTime);
    }

    if (currentRequests > maxRequest) {
        return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    next();
};

export default throttleMiddleware;
