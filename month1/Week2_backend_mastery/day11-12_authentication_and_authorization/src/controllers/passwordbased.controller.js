import { User } from "../models/user.model.js";

// Sign up page
const signUpPage = async (req, res) => {
    res.render("layout", {
        title: "Sign Up | Password Based Authentication",
        view: "pages/passwordbased/sign",
        message: null,
    });
};

// login page
const loginPage = async (req, res) => {
    res.render("layout", {
        title: "Login | Password Based Authentication",
        view: "pages/passwordbased/login",
        message: null,
    });
};

// register the user
const signInUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.render("layout", {
            title: "Sign Up | Password Based Authentication",
            view: "pages/passwordbased/sign",
            message: "All fields are required. Please try again.",
        });
    }

    const existsedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existsedUser) {
        return res.render("layout", {
            title: "Sign Up | Password Based Authentication",
            view: "pages/passwordbased/sign",
            message: "User With Email Or Username Is Already Exists",
        });
    }

    try {
        const createdUser = await User.create({
            username,
            email,
            password,
        });

        return res.render("layout", {
            title: "Login | Password Based Authentication",
            view: "pages/passwordbased/login",
            message: "User Created Successfully. Please LogIn To Continue.",
        });
    } catch (error) {
        return res.render("layout", {
            title: "Sign Up | Password Based Authentication",
            view: "pages/passwordbased/sign",
            message: "An error occurred. Please try again.",
        });
    }
};

// login the user
const logInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("layout", {
            title: "Login | Password Based Authentication",
            view: "pages/passwordbased/login",
            message: "All fields are required. Please try again.",
        });
    }

    const existsedUser = await User.findOne({ email });
    if (!existsedUser) {
        return res.render("layout", {
            title: "Login | Password Based Authentication",
            view: "pages/passwordbased/login",
            message: "User Not Found",
        });
    }

    const passwordMatch = await existsedUser.isPasswordCorrect(password);
    if (!passwordMatch) {
        return res.render("layout", {
            title: "Login | Password Based Authentication",
            view: "pages/passwordbased/login",
            message: "Password Not Match",
        });
    }

    // Create Session
    req.session.userId = existsedUser?._id;
    req.session.username = existsedUser?.username;

    return res.redirect("/password-based/dashboard");
};

// Login Dashboard
const dashboardUser = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/password-based/login");
    }

    const userData = await User.findOne({ _id: req.session.userId });
    const username = userData?.username;
    const email = userData?.email;
    const datetime = new Date(userData?.updatedAt).toLocaleDateString();

    return res.render("layout", {
        title: "Dashboard | Password Based Authentication",
        view: "pages/passwordbased/dashboard",
        username,
        email,
        datetime,
    });
};

// LogOut User
const logOutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render("layout", {
                title: "Login | Password Based Authentication",
                view: "pages/passwordbased/login",
                message: err?.message,
            });
        }
        return res.render("layout", {
            title: "Login | Password Based Authentication",
            view: "pages/passwordbased/login",
            message: "Logged Out successfully",
        });
    });
};

export { loginPage, signUpPage, signInUser, logInUser, dashboardUser, logOutUser };
