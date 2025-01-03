import express from "express";
import cors from "cors";
const app = express();
import postRouter from "./routers/post.router.js";

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// Route
app.use("/post", postRouter);
export { app };
