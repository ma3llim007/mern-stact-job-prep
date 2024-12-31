import { Router } from "express";
import {
    dashboardUser,
    disable2fa,
    downloadBackupCodes,
    enable2fa,
    login,
    loginUser,
    logOutUser,
    register,
    registerUser,
    tokenVerification,
    twoFAPage,
} from "../controllers/twoFactor.controller.js";

const router = Router();

// Router
router.route("/").get(login);
router.route("/register").get(register);
router.route("/create-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/dashboard").get(dashboardUser);
router.route("/enable-2fa").post(enable2fa);
router.route("/disable-2fa").post(disable2fa);
router.route("/2fa-token").get(twoFAPage);
router.route("/verify-token").post(tokenVerification);
router.route("/logout").post(logOutUser);
router.route("/download-secure-code").post(downloadBackupCodes);
router.route("/verify-backup-code").get(downloadBackupCodes);

export default router;
