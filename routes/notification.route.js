const express = require("express");
const router = express.Router();
const { notificationController } = require("../controllers");
const { auth } = require("../middlewares/auth.middleware");

router.get("/", auth, notificationController.listNotification);
router.patch("/", auth, notificationController.markAllAsRead);
router.patch("/:id", auth, notificationController.markAsRead);

module.exports = router;