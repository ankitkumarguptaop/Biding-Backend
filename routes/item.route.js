const express = require("express");
const router = express.Router();
const {itemController} = require("../controllers");
const { auth } = require("../middlewares/auth.middleware");
const { upload } = require("../configs/cloudinary");
const { role } = require("../middlewares/role.middleware");

router.get("/", auth, itemController.listItems);
router.get("/:id", auth, itemController.getItem);
router.post("/", auth, role("ADMIN"), upload.single("image"), itemController.createItem);


module.exports = router;
