const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codeial_dev");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting the Mongo DB"));

db.once("open", function () {
  console.log("Mongo DB:: Now Running");
});
