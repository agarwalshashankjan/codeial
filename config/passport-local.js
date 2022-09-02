const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        console.log("Error in finding the User ===> Passport");
        return done(err);
      }
      if (!user || user.password != password) {
        console.log("Invalid Username/Password");
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error finding the user ===> passport");
      return done(err);
    } else {
      return done(null, user);
    }
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // if user is not authenticated then return to sign in page
  else {
    return res.redirect("/users/signin");
  }
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user and we are sesending this user to view
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
