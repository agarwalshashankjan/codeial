const Post = require("../models/post");
module.exports.create = function (req, res) {
  console.log("User ID:::::::::::::", req.user._id);
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error creating the post:", err);
        return;
      } else {
        return res.redirect("back");
      }
    }
  );
};
