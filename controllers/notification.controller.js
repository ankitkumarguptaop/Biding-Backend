const { notificationService } = require("../services");

exports.listNotification = async (req, res, next) => {
  try {
    const notifications = await notificationService.listNotification(req);
    res.status(200).json({
      success: true,
      message: "Notifications listed successfully",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    const notifications = await notificationService.markAllAsRead(req);
    res.status(200).json({
      success: true,
      message: "Notifications marked as read successfully",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notifications = await notificationService.markAsRead(req);
    res.status(200).json({
      success: true,
      message: "Notifications marked as read successfully",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};