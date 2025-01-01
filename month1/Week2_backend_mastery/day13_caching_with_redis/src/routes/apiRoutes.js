import { Router } from "express";
import cacheMiddleware from "../cache/cacheMiddleware.js";
import getData from "../controllers/apiController.js";

const router = Router();

// Route with caching middleware
router.get("/data", cacheMiddleware, getData);

export default router;
