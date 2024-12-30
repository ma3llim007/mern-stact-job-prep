import { Router } from "express";
import {
    dashboardUser,
    loginPage,
    logInUser,
    logOutUser,
    signInUser,
    signUpPage,
} from "../controllers/passwordbased.controller.js";

const router = Router();

// Router
router.route("/signup").get(signUpPage);
router.route("/signin").post(signInUser);
router.route("/login").get(loginPage);
router.route("/loginuser").post(logInUser);
router.route("/dashboard").get(dashboardUser);
router.route("/logout").post(logOutUser);

export default router;
