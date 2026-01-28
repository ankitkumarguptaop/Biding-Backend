const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { upload } = require("../configs/cloudinary");

router.post("/signup", upload.single("image"), userController.signUp);

router.post("/signin", userController.signIn);

module.exports = router;
