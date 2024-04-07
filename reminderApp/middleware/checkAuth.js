module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.isAuthenticated = false;
      return next();
    }
    res.redirect("/auth/login");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.locals.isAuthenticated = true;
      return next();
    }
    res.redirect("/reminder");
  },

  isAdmin: function (req, res, next) {
    if (req.user.role !== "admin") {
      return next();
    }
    res.redirect("/reminder");
  },
};
