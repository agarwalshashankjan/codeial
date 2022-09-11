const Post = require("../models/post");

module.exports.home = function (req, res) {
  // Post.find({})
  //   .populate("user")
  //   .exec(function (err, posts) {
  //     console.log(posts);
  //     return res.render("home", {
  //       title: "Codeila | Home",
  //       posts: posts,
  //     });
  //   });
  Post.find({}, function (err, posts) {
    return res.render("home", {
      title: "Codeila | Home",
      posts: posts,
    });
  });
};
