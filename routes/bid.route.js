const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { bidController } = require("../controllers");
const router = express.Router();


router.get("/", auth, bidController.listBids);
router.post("/", auth, bidController.createBid);

module.exports = router;
