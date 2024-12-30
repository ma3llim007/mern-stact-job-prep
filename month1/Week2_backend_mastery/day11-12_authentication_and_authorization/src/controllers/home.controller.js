const homePage = async (req, res) => {
    res.render("layout", {
        title: "Home | Authentication And Authorization",
        view: "pages/index",
    });
};

export { homePage };
