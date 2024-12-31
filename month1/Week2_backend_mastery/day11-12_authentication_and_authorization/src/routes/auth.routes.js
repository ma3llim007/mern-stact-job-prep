import { Router } from "express";
import { googleCallBack, googleLogin, logOut } from "../controllers/home.controller.js";

const router = Router();

// router define
router.route("/google").get(googleLogin);
router.route("/google/callback").get(googleCallBack);
router.route("/logout").post(logOut);

export default router;
