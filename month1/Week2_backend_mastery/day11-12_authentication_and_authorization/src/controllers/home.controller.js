import passport from "passport";

const homePage = async (req, res) => {
    res.render("layout", {
        title: "Home | Authentication And Authorization",
        view: "pages/index",
    });
};

// Start the Google authentication process
const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallBack = passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
});

const logOut = async (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

export { homePage, googleCallBack, googleLogin,logOut };
