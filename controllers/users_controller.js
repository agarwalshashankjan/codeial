const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

module.exports.posts = function (req, res) {
  return res.render("posts", {
    title: "Posts",
  });
};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  } else return res.render("user_sign_in", { title: "Signin" });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  } else return res.render("user_sign_up", { title: "Singup" });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error finding the user: ", err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error creating the user:, ", err);
          return;
        } else {
          return res.redirect("/users/signin");
        }
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
