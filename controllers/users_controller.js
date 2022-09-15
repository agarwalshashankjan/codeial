const User = require("../models/user");
const signinMailer = require("../mailers/singin_mailer");

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
    return res.redirect("/user/profile");
  } else return res.render("user_sign_in", { title: "Signin" });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  } else return res.render("user_sign_up", { title: "Singup" });
};

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    user = {};
    User.uploadAvatar(req, res, async function (err) {
      console.log(req.body);
      if (err) {
        console.log("***********Multer Error*********************", err);
      } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        // console.log("Body*********************", req.file.file);
        if (req.file) {
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        await User.create(user);
      }
    });

    return res.redirect("/users/signin");
  } else {
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  console.log(req.user.email, req.user.name);
  signinMailer.signin(req.user);
  req.flash("success", "Logged in Successfully");
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "Logged Out Successfully");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
