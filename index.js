const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(expressLayouts);
app.use(express.static("./assets"));

app.use("/", require("./routes"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, function (error) {
  if (error) {
    console.log(`Error running the server: ${error}`);
  }
  console.log(`Server is up and running at the port: ${port}`);
});
