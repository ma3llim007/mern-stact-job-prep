import { TokenUser } from "../models/token_user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await TokenUser.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save();
        return { accessToken, refreshToken };
    } catch (error) {
        console.log("Something went wrong while generating referesh and access token");
    }
};

const signUpPage = async (req, res) => {
    res.render("layout", {
        title: "Register | Token Based Authentication",
        view: "pages/token/singup",
        message: null,
    });
};

const loginPage = async (req, res) => {
    res.render("layout", {
        title: "Register | Token Based Authentication",
        view: "pages/token/login",
        message: null,
    });
};

const createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("layout", {
            title: "Register | Token Based Authentication",
            view: "pages/token/singup",
            message: "All fields are required. Please try again.",
        });
    }
    try {
        // Check if the user already exists
        const user = await TokenUser.findOne({ email });
        if (user) {
            return res.render("layout", {
                title: "Register | Token Based Authentication",
                view: "pages/token/singup",
                message: "User With Email Is Already Exists",
            });
        }

        const newUser = await TokenUser.create({
            email,
            password,
        });

        res.render("layout", {
            title: "Login | Token Based Authentication",
            view: "pages/token/login",
            message: "User Register Successfully. Login",
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/token-based/signup/");
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("layout", {
            title: "Login | Token Based Authentication",
            view: "pages/token/login",
            message: "All fields are required. Please try again.",
        });
    }

    // Find the user
    const existsedUser = await TokenUser.findOne({ email });
    if (!existsedUser) {
        return res.render("layout", {
            title: "Login | Token Based Authentication",
            view: "pages/token/login",
            message: "User Not Found.",
        });
    }

    // Verify password
    const passwordMatch = existsedUser.isPasswordCorrect(password);
    if (!passwordMatch) {
        return res.render("layout", {
            title: "Login | Token Based Authentication",
            view: "pages/token/login",
            message: "Password Not Match",
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existsedUser._id);
    const options = {
        httpOnly: true,
        secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res.redirect("/token-based/dashboard");
};

const dashboard = async (req, res) => {
    const userData = await TokenUser.findOne({ _id: req.user._id });

    // If no user data is found, handle it gracefully
    const { email, updatedAt } = userData;
    const datetime = updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A";

    return res.render("layout", {
        title: "Register | Token Based Authentication",
        view: "pages/token/dashboard",
        message: null,
        email,
        datetime,
    });
};

const logOut = async (req, res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.render("layout", {
        title: "Login | Token Based Authentication",
        view: "pages/token/login",
        message: "Logged Out Successfully.",
    });
};
export { signUpPage, loginPage, createUser, loginUser, dashboard, logOut };
