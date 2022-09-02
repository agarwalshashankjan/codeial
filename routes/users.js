const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/posts", usersController.posts);
router.get("/signin", usersController.signin);
router.get("/signup", usersController.signup);
router.get("/signout", usersController.destroySession);
router.post("/create", usersController.create);
router.post(
  "/create_session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  usersController.createSession
);

module.exports = router;
