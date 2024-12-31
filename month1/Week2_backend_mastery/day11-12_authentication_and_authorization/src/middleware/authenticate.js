import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.render("layout", {
            title: "Login | Token Based Authentication",
            view: "pages/token/login",
            message: "Access Denied",
        });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");

        req.user = decoded; // Attach user information to the request object
        next();
    });
};
