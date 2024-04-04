const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
const router = express.Router();

router.get("/login", forwardAuthenticated, authController.login);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

module.exports = router;
