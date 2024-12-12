const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("upload");
});

module.exports = userRouter;
