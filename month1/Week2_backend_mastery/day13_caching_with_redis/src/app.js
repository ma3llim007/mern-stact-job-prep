import express from "express";
import apiRouter from "./routes/apiRoutes.js";

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// API routes
app.use("/api", apiRouter);

export default app;
