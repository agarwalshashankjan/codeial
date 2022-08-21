const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

app.use("/", require("./routes"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (error) {
  if (error) {
    console.log(`Error running the server: ${error}`);
  }
  console.log(`Server is up and running at the port: ${port}`);
});
