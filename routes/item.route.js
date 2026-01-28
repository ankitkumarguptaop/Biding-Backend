const express = require("express");
const router = express.Router();
const {itemController} = require("../controllers");
const { auth } = require("../middlewares/auth.middleware");
const { upload } = require("../configs/cloudinary");

router.get("/", itemController.listItems);
router.post("/", auth,  upload.single("image"), itemController.createItem);
module.exports = router;
