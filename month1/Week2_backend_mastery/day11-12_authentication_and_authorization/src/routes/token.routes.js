import { Router } from "express";
import { createUser, dashboard, loginPage, loginUser, logOut, signUpPage } from "../controllers/token.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = Router();

router.route("/").get(loginPage);
router.route("/signup").get(signUpPage);
router.route("/dashboard").get(authenticate, dashboard);
router.route("/create-user").post(createUser);
router.route("/loginuser").post(loginUser);
router.route("/logout").post(logOut);

export default router;
