const express = require("express");
const passport = require("../middleware/passport");
const {
  forwardAuthenticated,
  ensureAuthenticated,
} = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", forwardAuthenticated, authController.login);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminder",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
