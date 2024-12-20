import rateLimit from "express-rate-limit";

const useLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: true,
    handler: (req, res, next, option) => {
        res.status(429).json({
            error: "Too Many Request. Please Try Again After 15 Minutes!",
        });
    },
});

export default useLimiter;
