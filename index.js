const express = require("express");
const { dbConnection } = require("./configs/db");
dbConnection();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: true }))
app.use("/", require("./routes"));
app.use(require("./middlewares/error.middleware").errorHandler);

app.listen(port, () => {
  console.log("app listen on port", port);
});
