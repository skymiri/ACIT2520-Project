// function for create reminder with banner(img from unsplash)
// unsplash - https://unsplash.com/documentation#search-photos
// www.npmjs.com/package/node-fetch
const keywordToImage = async (keyword) => {
  const accessKey = "M01LaaSpas4tFHmQSAGTHjq7_7KzSIG77Pvhq9pfj_A";
  const url = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const randomImg = Math.floor(Math.random() * data.results.length);
  if (data.results && data.results.length > 0) {
    const imageUrl = data.results[randomImg].urls.full;
    return imageUrl;
  }
};

let reminderController = {
  home: (req, res) => {
    res.render("index");
  },

  list: (req, res) => {
    if (req.user.role === "admin") {
      const store = req.sessionStore;
      store.all((err, sessions) => {
        res.render("admin", {
          user: req.user,
          sessions: sessions,
          role: req.user.role,
        });
      });
    } else {
      res.render("reminder", {
        reminder: req.user.reminder,
        name: req.user.name,
      });
    }
  },

  destroy: (req, res) => {
    const store = req.sessionStore;
    const sid = req.params.id;

    store.destroy(sid, (err) => {
      res.clearCookie(sid);
    });

    store.all((err, sessions) => {
      console.log(sessions);
      res.redirect("/reminder");
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

  // create: (req, res) => {
  //   let reminder = {
  //     id: req.user.reminder.length + 1,
  //     title: req.body.title,
  //     description: req.body.description,
  //     completed: false,
  //   };
  //   req.user.reminder.push(reminder);
  //   res.redirect("/reminder");
  // },

  // create reminder with banner
  create: async (req, res) => {
    let imgUrl = await keywordToImage(req.body.keyword);
    let reminder = {
      id: req.user.reminder.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      keyword: req.body.keyword,
      banner: imgUrl,
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

  update: async (req, res) => {
    let reminderId = req.params.id;
    let index = req.user.reminder.findIndex(
      (reminder) => reminder.id == reminderId
    );

    let imgUrl = await keywordToImage(req.body.keyword);
    // console.log(imgUrl);
    if (index !== -1) {
      req.user.reminder[index].title = req.body.title;
      req.user.reminder[index].description = req.body.description;
      req.user.reminder[index].completed = req.body.completed === "true";
      req.user.reminder[index].keyword = req.body.keyword;
      req.user.reminder[index].banner = imgUrl;

      res.redirect(`/reminder/${reminderId}`);
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
