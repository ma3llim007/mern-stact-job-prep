import express from "express";
import path from "path";
import router from "./routes/web.routes.js";
import passwordBasedRouter from "./routes/passwordbased.routes.js";
import bodyParser from "body-parser";
import session from "express-session";

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

// Settting Router
app.use("/", router);
app.use("/password-based", passwordBasedRouter);

export default app;
