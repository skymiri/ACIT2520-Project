let database = require("../models/userModel");

let remindersController = {
  // get
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  // get
  new: (req, res) => {
    res.render("reminder/create");
  },

  // get
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  // post
  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminder/index");
  },

  // get
  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  // post
  update: (req, res) => {
    let reminderToUpdate = req.params.id - 1;
    req.user.reminders[reminderToUpdate].title = req.body.title;
    req.user.reminders[reminderToUpdate].description = req.body.description;
    req.user.reminders[reminderToUpdate].completed =
      req.body.completed === "true";
    res.redirect("/reminder/index");
  },

  // post
  delete: (req, res) => {
    let reminderToDelete = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    req.user.reminders.splice(searchResult.id - 1, 1);
    res.redirect("/reminder/index");
  },
};

module.exports = remindersController;
