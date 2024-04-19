let database = require("../database.json");
const userController = require("./userController");
const fs = require("fs");

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
    res.render("auth/register", { email: req.query.email });
  },

  loginSubmit: (req, res) => {
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

  // post (register)
  // reference : https://www.passportjs.org/tutorials/password/signup/
  registerSubmit: (req, res) => {
    var user = {
      id: database.length + 1,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user",
      reminder: [],
    };

    database.push(user);

    fs.writeFile("database.json", JSON.stringify(database), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Registered successfully");
      res.redirect("/login");
    });

    console.log(database);
  },
};

module.exports = authController;
