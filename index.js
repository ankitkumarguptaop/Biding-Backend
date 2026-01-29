const express = require("express");
const { dbConnection } = require("./configs/db");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./libs/socketConnection");
const { socketAuthMiddleware } = require("./middlewares/socket-auth.middleware");
const cron = require("node-cron");
const { changeItemStatus } = require("./services/item.service");
dbConnection();

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = initSocket(server);
io.use(socketAuthMiddleware);

cron.schedule("*/5 * * * * *", changeItemStatus);


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
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.use(require("./middlewares/error.middleware").errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
