const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const mongoStore = require("connect-mongodb-session")(session);

app.use(expressLayouts);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
  session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || " connecting mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));
app.listen(port, function (error) {
  if (error) {
    console.log(`Error running the server: ${error}`);
  }
  console.log(`Server is up and running at the port: ${port}`);
});
