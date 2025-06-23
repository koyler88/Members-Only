const db = require("../db/queries");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

exports.signupPost = [
  body("fname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name is required.")
    .isAlpha()
    .withMessage("First name must contain only letters.")
    .escape(),
  body("lname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name is required.")
    .isAlpha()
    .withMessage("Last name must contain only letters.")
    .escape(),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .escape(),
  body("confirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign-up", {
        title: "Sign-up",
        message: null,
        errors: errors.array(),
        values: req.body,
      });
    }
    const info = req.body;
    try {
      const userTaken = await db.checkforuser(info.username);

      if (userTaken) {
        return res.render("sign-up", {
          title: "Sign-up",
          errors: [{ msg: "Username already taken. Please choose another." }],
          message: null,
          values: req.body,
        });
      }

      await db.createuser(info);

      res.render("sign-up", {
        title: "Sign-up",
        message: "Signup successful!",
        errors: [],
        values: {},
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

exports.loginPost = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }),
];

exports.createPost = [
  body("title").trim().escape(),
  body("message").trim().escape(),

  async (req, res) => {
    const { title, message } = req.body;
    const user = req.user;
    await db.createPost(title, message, user.username);
    res.redirect("/dashboard");
  },
];

exports.dashboard = async (req, res) => {
  const posts = await db.getPosts();
  res.render("dashboard", { title: "Dashboard", user: req.user, posts: posts });
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const user = req.user?.username;

  if (!user) return res.status(401).send("Unauthorized");

  const authorOfPost = await db.getAuthor(postId);

  if (authorOfPost !== user) {
    return res.status(403).send("Forbidden: You are not the author.");
  }

  await db.deletePost(postId);
  res.redirect("/dashboard");
};

exports.memberPost = async (req, res) => {
  const { phrase } = req.body;
  const user = req.user;
  console.log(user);
  if (phrase === process.env.SECRET_PHRASE) {
    await db.giveMembership(user.id);
    req.user.member = true;
    return res.redirect("/dashboard");
  } else {
    return res.render("memberForm", {
      title: "Become a member",
      error: "Sorry, that's not the secret phrase",
    });
  }
};
