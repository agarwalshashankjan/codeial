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
  return res.render("user_sign_in", { title: "Signin" });
};

module.exports.signup = function (req, res) {
  return res.render("user_sign_up", { title: "Singup" });
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
        }
        return res.redirect("/users/signin");
      });
    }
    return res.redirect("back");
  });
};

module.exports.createSession = function (req, res) {
  // To DO
};
