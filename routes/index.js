const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/items", require("./item.route"));
router.use("/bids", require("./bid.route"));

module.exports = router;
