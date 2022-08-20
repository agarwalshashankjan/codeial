const express = require("express");
const port = 8000;
const app = express();

app.use("/", require("./routes"));

app.listen(port, function (error) {
  if (error) {
    console.log(`Error running the server: ${error}`);
  }
  console.log(`Server is up and running at the port: ${port}`);
});
