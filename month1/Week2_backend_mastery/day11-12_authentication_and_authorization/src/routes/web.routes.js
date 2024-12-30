import { Router } from "express";
import { homePage } from "../controllers/home.controller.js";

const router = Router();

// router define
router.route("/").get(homePage);

export default router;
