const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const authController = require("./controller/auth_controller");

// pull practice
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);

// Routes start here
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated
//     ? req.isAuthenticated()
//     : false;
//   next();
// });

app.use("/", indexRoute);
app.use("/auth", authRoute);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", authController.login);

// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);

//   console.log("Entire session object:");
//   console.log(req.session);

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

// code for BONUS
//next we need oauth token and change views
// const fetch = require("node-fetch")
// async function keywordToImage(keyword) {
//     const url = `https://api.unsplash.com/search/photos?page=1&query=${keyword}`;
//     // console.log(url)
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data)
//     // return imageUrl;
// }

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/ in your browser 🚀"
  );
});
