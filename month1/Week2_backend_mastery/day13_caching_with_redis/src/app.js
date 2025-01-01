import express from "express";
import apiRouter from "./routes/apiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pubSubRoutes from "./routes/pubSubRoutes.js";
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./cache/redisClient.js";
import subscribeToChannel from "./pubsub/subscriber.js";

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Configure session with Redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRETKEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 30,
        },
    })
);

// API routes
app.use("/api", apiRouter);
app.use("/user", userRoutes);
app.use("/pubsub", pubSubRoutes);

// Start subscriber
subscribeToChannel("notifications");
export default app;
