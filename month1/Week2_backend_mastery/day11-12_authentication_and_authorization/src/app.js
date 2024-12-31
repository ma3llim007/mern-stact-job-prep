import express from "express";
import path from "path";
import router from "./routes/web.routes.js";
import passwordBasedRouter from "./routes/passwordbased.routes.js";
import twoFactorAuthenticationRouter from "./routes/twoFactor.routes.js";
import tokenBasedAuthenticationRouter from "./routes/token.routes.js";
import authRouter from "./routes/auth.routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/password.js";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated.js";

const __dirname = import.meta.dirname;
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for EJS files (default is "./views")
app.set("views", path.join(__dirname, "views"));

// Set Static Public
app.use(express.static("public"));

// Built-in middleware for JSON parsing
app.use(express.json());

// Built-in middleware for URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Session setup
const sessionSecret = process.env.SESSION_SECRETKEY || "my-very-secure-session-secret";
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Settting Router
app.use("/", router);
app.use("/password-based", passwordBasedRouter);
app.use("/2fa", twoFactorAuthenticationRouter);
app.use("/token-based", tokenBasedAuthenticationRouter);
app.use("/auth", authRouter);

// Profile route (protected)
app.get("/profile", ensureAuthenticated, (req, res) => {
    res.render("layout", {
        title: "Profile | OAuth Authentication",
        view: "profile",
        user: req.user._json,
    });
});

export default app;
