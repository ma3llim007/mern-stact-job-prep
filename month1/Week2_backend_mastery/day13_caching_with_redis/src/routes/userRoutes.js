import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    // Simulate a login and store session data
    req.session.user = {
        id: 1,
        username: "testUserName",
    };
    res.send("User Logged In And Session Created");
});

router.get("/profile", (req, res) => {
    // Retrieve session data
    if (req.session.user) {
        res.json({
            message: "User profile data",
            user: req.session.user,
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

router.get("/logout", (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.send("User logged out and session destroyed");
    });
});

export default router;
