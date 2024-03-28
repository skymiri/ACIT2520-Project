let database = [
  {
    id: 1,
    name: "Cindy Heim",
    email: "cindy123@gmail.com",
    password: "cindy123!",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: true,
      },
      {
        id: 2,
        title: "Watch movie",
        description: "Buy tickets in advance",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Alex Cooper",
    email: "alex123@gmail.com",
    password: "alex123!",
    reminders: [
      {
        id: 1,
        title: "Workout in the gym",
        description: "30 Min Upperbody Dumbbell workout",
        completed: false,
      },
    ],
  },
];

module.exports = database;
