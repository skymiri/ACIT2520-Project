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

// router.post(
//   "/login",
//   passport.authenticate("local"),
//   authController.loginSubmit
// );

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth/login");
  });
});

router.get("/register", forwardAuthenticated, authController.register);
router.post("/register", forwardAuthenticated, authController.registerSubmit);

module.exports = router;
