const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const db = require("../db/queries")

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

indexRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const posts = await db.getPosts()
    return res.render("dashboard", { title: "Dashboard", user: req.user, posts: posts });
  }
  res.render("index", { title: "Homepage" });
});

indexRouter.get("/sign-up", async (req, res) => {
  if (req.isAuthenticated()) {
    const posts = await db.getPosts()
    return res.render("dashboard", { title: "Dashboard", user: req.user, posts: posts });
  }
  res.render("sign-up", { title: "Sign-up", errors: [], message: null, values: {} });
});

indexRouter.post("/signup", indexController.signupPost);

indexRouter.get("/login", async (req, res) => {
  if (req.isAuthenticated()) {
    const posts = await db.getPosts()
    return res.render("dashboard", { title: "Dashboard", user: req.user, posts: posts });
  }
  res.render("login", { title: "Log-in" });
});

indexRouter.post("/login", indexController.loginPost);

indexRouter.get("/dashboard", ensureAuthenticated, indexController.dashboard);

indexRouter.get("/create", ensureAuthenticated, (req, res) => {
  res.render("create", { title: "Create Post", user: req.user });
});

indexRouter.post("/create", ensureAuthenticated, indexController.createPost);

indexRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.post("/delete/:id", ensureAuthenticated, indexController.deletePost)

indexRouter.get("/member", (req, res) => {
    res.render("memberForm", {title: "Become a member", error: null})
})

indexRouter.post("/member", indexController.memberPost)

module.exports = indexRouter;
