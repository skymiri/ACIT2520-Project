const express = require("express");
let database = require("../models/userModel");
const userModel = require("../models/userModel").userModel;
const userController = require("./userController");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement later
    const { email, password } = req.body;
    let user = userController.getUserByEmailIdAndPassword(email, password);
    if (user) {
      req.session.user = user;
      res.redirect("/reminder");
    } else {
      console.log(err);
      res.render("auth/login", { error: "Invalid email or password" });
    }
  },
};

//   registerSubmit: (req, res) => {
//     // implement later
//   },
// };

module.exports = authController;
