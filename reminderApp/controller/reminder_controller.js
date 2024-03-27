let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
  },

  delete: (req, res) => {
    // implementation here 👈
    // xinyu's solution Mar. 26
    let reminderToDelete = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    // find the index of the element to be removed
    index = database.cindy.reminders.indexOf(searchResult); 
    console.log(index); // for debugging puposes
    // remove the element, with the index, without leftover empty space
    database.cindy.reminders.splice(index, 1) 
    console.log(database.cindy.reminders); // for debugging puposes
    res.redirect("/reminders");
    // end of xinyu's solution Mar. 26
  },
};

module.exports = remindersController;
