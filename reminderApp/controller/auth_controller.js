const express = require("express");
let database = require("../database");
const userModel = require("../models/userModel").userModel;
const userController = require("./userController");

let authController = {
  login: (req, res) => {
    res.render("auth/login", {
      isAuthenticated: req.isAuthenticated,
    });
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement later
    const email = req.body.email;
    const password = req.body.password;
    try {
      let user = userController.getUserByEmailIdAndPassword(email, password);
      if (user) {
        req.session.user = user;
        res.redirect("/reminder");
      } else {
        res.render("auth/login", { error: "Invalid email or password" });
      }
    } catch (error) {
      res.render("auth/login", { error: error.message });
    }
  },
};
//   registerSubmit: (req, res) => {
//     // implement later
//   },
// };

module.exports = authController;
