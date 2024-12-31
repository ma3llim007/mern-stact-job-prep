import { TwoFactorAuthUser } from "../models/two_factor_user.model.js";
import { generate2faSecret, generateBackUpCodes, verifyToken } from "../services/twoFactorsService.js";

// register page
const register = async (req, res) => {
    res.render("layout", {
        title: "Register | Two Factor Authentication",
        view: "pages/2fa/register",
        message: null,
    });
};

// Login page
const login = async (req, res) => {
    res.render("layout", {
        title: "Login | Two Factor Authentication",
        view: "pages/2fa/login",
        message: null,
    });
};

// 2FA page
const twoFAPage = async (req, res) => {
    res.render("layout", {
        title: "Login | Two Factor Authentication",
        view: "pages/2fa/token",
        message: null,
    });
};

// registering the user
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("layout", {
            title: "Register | Two Factor Authentication",
            view: "pages/2fa/register",
            message: "All fields are required. Please try again.",
        });
    }
    try {
        // Check if the user already exists
        const existsedUser = await TwoFactorAuthUser.findOne({ email });

        if (existsedUser) {
            return res.render("layout", {
                title: "Register | Two Factor Authentication",
                view: "pages/2fa/register",
                message: "User With Email Is Already Exists",
            });
        }

        // Generate 2FA Secret
        const { secret, qrCodeUrl } = await generate2faSecret(email);

        // Create new user
        const newUser = await TwoFactorAuthUser.create({
            email,
            password,
            twoFactorsSecret: secret,
        });

        res.render("layout", {
            title: "Login | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "User Register Successfully. Login",
            qrCodeUrl,
            secret,
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/2fa/register");
    }
};

// login the user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render("layout", {
            title: "Login | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "All fields are required. Please try again.",
        });
    }

    // Find the user
    const existsedUser = await TwoFactorAuthUser.findOne({ email });
    if (!existsedUser) {
        return res.render("layout", {
            title: "Login | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "User Not Found.",
        });
    }

    // Verify password
    const passwordMatch = await existsedUser.isPasswordCorrect(password);
    if (!passwordMatch) {
        return res.render("layout", {
            title: "Login | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "Password Not Match",
        });
    }

    // If 2FA is enabled, verify the token
    if (existsedUser.is2faEnabled) {
        req.session.userObj = existsedUser;
        return res.render("layout", {
            title: "Enter 2FA Token | Two Factor Authentication",
            view: "pages/2fa/token",
            message: null,
        });
    } else {
        // Create Session
        req.session.userId = existsedUser._id;
        return res.redirect("/2fa/dashboard");
    }
};

// Verify The Token
const tokenVerification = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.render("layout", {
            title: "Enter 2FA Token | Two Factor Authentication",
            view: "pages/2fa/token",
            message: "2FA token is required.",
        });
    }
    const isTokenValid = await verifyToken(req.session.userObj, token);

    if (!isTokenValid) {
        return res.render("layout", {
            title: "Enter 2FA Token | Two Factor Authentication",
            view: "pages/2fa/token",
            message: "2FA token is required.",
        });
    }

    req.session.userId = req.session.userObj._id;
    delete req.session.userObj; // Cleanup temporary session data
    return res.redirect("/2fa/dashboard");
};

// Enable 2FA for the user
const enable2fa = async (req, res) => {
    try {
        const user = await TwoFactorAuthUser.findById(req.session.userId);

        if (user.is2faEnabled) {
            return res.render("layout", {
                title: "LogIn | Two Factor Authentication",
                view: "pages/2fa/login",
                message: "2FA is already enabled.",
            });
        }
        const { qrCodeUrl, secret } = await generate2faSecret(user?.email);
        const backupCodes = generateBackUpCodes();

        user.is2faEnabled = true;
        user.twoFactorsSecret = secret;
        user.backupCodes = backupCodes;
        
        console.log(secret);
        await user.save();

        return res.render("layout", {
            title: "Enable 2FA",
            view: "pages/2fa/enable2fa",
            qrCodeUrl,
        });
    } catch (error) {
        console.error(error);
        return res.render("layout", {
            title: "Error | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "An error occurred while enabling 2FA.",
        });
    }
};

// Disable 2FA for the user
const disable2fa = async (req, res) => {
    try {
        const user = await TwoFactorAuthUser.findById(req.session.userId);

        if (user.is2faEnabled === false) {
            return res.render("layout", {
                title: "LogIn | Two Factor Authentication",
                view: "pages/2fa/login",
                message: "2FA is already Disable.",
            });
        }
        user.is2faEnabled = false;
        user.twoFactorsSecret = null;
        user.backupCodes = null;

        await user.save();

        res.redirect("/2fa/dashboard");
    } catch (error) {
        console.error(error);
        return res.render("layout", {
            title: "Error | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "An error occurred while enabling 2FA.",
        });
    }
};

// Login Dashboard
const dashboardUser = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/2fa/");
    }

    try {
        const userData = await TwoFactorAuthUser.findOne({ _id: req.session.userId });

        // If no user data is found, handle it gracefully
        const { email, is2faEnabled, updatedAt, backupCodes } = userData;
        const datetime = updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A";

        return res.render("layout", {
            title: "Dashboard | Two Factor Authentication",
            view: "pages/2fa/dashboard",
            email,
            datetime,
            is2faEnabled,
            backupCodes,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).render("layout", {
            title: "Error | Two Factor Authentication",
            view: "pages/2fa/",
            message: "An error occurred while loading the dashboard.",
        });
    }
};

// LogOut User
const logOutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render("layout", {
                title: "Login | Two Factor Authentication",
                view: "pages/2fa/login",
                message: err?.message,
            });
        }
        return res.render("layout", {
            title: "Login | Two Factor Authentication",
            view: "pages/2fa/login",
            message: "Logged Out successfully",
        });
    });
};

const downloadBackupCodes = async (req, res) => {
    try {
        const user = await TwoFactorAuthUser.findById(req.session.userId);

        if (!user || !user.backupCodes || user.backupCodes.length === 0) {
            return res.render("layout", {
                title: "Dashboard | Two Factor Authentication",
                view: "pages/2fa/dashboard",
                message: "No backup codes available.",
            });
        }
        const backupCodesText = user.backupCodes.join("\n");

        // Set headers to force download the file
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Content-Disposition", "attachment; filename=backup_codes.txt");

        // Send the backup codes text as a downloadable file
        res.send(backupCodesText);
    } catch (error) {
        console.error("Error downloading backup codes:", error);
        return res.render("layout", {
            title: "Dashboard | Two Factor Authentication",
            view: "pages/2fa/dashboard",
            message: "An error occurred while generating the backup codes file.",
        });
    }
};

export {
    register,
    login,
    registerUser,
    loginUser,
    dashboardUser,
    enable2fa,
    disable2fa,
    logOutUser,
    twoFAPage,
    tokenVerification,
    downloadBackupCodes,
};
