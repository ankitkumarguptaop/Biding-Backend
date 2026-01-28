const express = require("express");
const { dbConnection } = require("./configs/db");
dbConnection();
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log("app listen on port", port);
});
