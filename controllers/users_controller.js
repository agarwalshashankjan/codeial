const User = require("../models/user");
module.exports.profile = function (req, res) {
  console.log("user_id is : ", req.cookies.user_id);
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      console.log("Inside Fining user");
      if (err) {
        console.log("Error finding the user: ", err);
        return;
      }
      if (user) {
        console.log("Inside found the user");
        return res.render("profile", {
          title: "Profile",
          user: user,
        });
      }
    });
  } else {
    return res.redirect("/users/signin");
  }
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
  // find user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error finding the user:, ", err);
      return;
    }
    // Handle user found
    if (user) {
      // handle password if they don't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle user session create
      res.cookie("user_id", user._id);
      return res.redirect("/users/profile");
    }
    // handle user not found
    else {
      return res.redirect("back");
    }
  });
};

module.exports.signout = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/users/signin");
};
