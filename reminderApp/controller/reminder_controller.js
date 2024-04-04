let database = require("../database");

let reminderController = {
  list: (req, res) => {
    res.render("reminder", {
      reminder: req.user.reminder,
      name: req.user.name,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminder.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", {
        reminderItem: searchResult,
      });
    } else {
      res.render("reminder", {
        reminder: req.user.reminder,
        name: req.user.name,
      });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminder.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminder.push(reminder);
    res.redirect("/reminder");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminder.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderId = req.params.id;
    let index = req.user.reminder.findIndex(
      (reminder) => reminder.id == reminderId
    );

    if (index !== -1) {
      req.user.reminder[index].title = req.body.title;
      req.user.reminder[index].description = req.body.description;
      req.user.reminder[index].completed = req.body.completed === "true";
      res.redirect("/reminder/");
    } else {
      res.status(404).send("Can't find reminder.");
    }
  },

  delete: (req, res) => {
    let reminderId = req.params.id;
    let index = req.user.reminder.findIndex(
      (reminder) => reminder.id == reminderId
    );

    if (index !== -1) {
      req.user.reminder.splice(index, 1);
      res.redirect("/reminder");
    } else {
      res.status(404).send("Can't find reminder.");
    }
  },
};
//   delete: (req, res) => {
//     // implementation here 👈
//     // xinyu's solution Mar. 26
//     let reminderToDelete = req.params.id;
//     let searchResult = req.user.reminder.find(function (reminder) {
//       return reminder.id == reminderToDelete;
//     });
//     // find the index of the element to be removed
//     index = req.user.reminder.indexOf(searchResult);
//     console.log(index); // for debugging puposes
//     // remove the element, with the index, without leftover empty space
//     req.user.reminder.splice(index, 1);
//     console.log(req.user.reminder); // for debugging puposes
//     res.redirect("/reminder");
//     // end of xinyu's solution Mar. 26
//   },
// };
// console.log(reminderController);
module.exports = reminderController;
