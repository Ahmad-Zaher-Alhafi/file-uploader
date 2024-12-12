const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

const isAuthunticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send("<h1>You are not authunticated</h1>");
  }
};

userRouter.get("/", (req, res) => {
  res.render("index");
});

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.post("/signup", userController.addUser);

userRouter.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/upload");
    return;
  }
  res.render("login");
});

userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/upload",
    failureRedirect: "/login",
  })
);

userRouter.post("/signup", userController.addUser);

userRouter.get("/upload", isAuthunticated, (req, res) => {
  res.render("upload", { user: req.user });
});

userRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = userRouter;
