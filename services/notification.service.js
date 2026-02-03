const { BadRequest } = require("../libs/errors");
const { userRepository } = require("../repositories");
const notificationRepository = require("../repositories/notification.repository");

exports.createNotificationToAll = async (payload) => {
  const message = payload.message;
  if (!message) {
    throw new BadRequest("Message is required to create notification");
  }

  const users = await userRepository.findAll({});
  users.forEach(async (user) => {
    console.log(message, "sended to ", user.id);

    await notificationRepository.create({
      userId: user.id,
      message: message,
    });
  });

  return { message: "Notification created successfully" };
};

exports.listNotification = async (payload) => {
  const { id } = payload.user;
  if (!id) {
    throw new BadRequest("User ID is required to list notifications");
  }

  const notifications = await notificationRepository.findAll({ criteria :{ userId: id }});

  return notifications;
};

exports.markAllAsRead = async (payload) => {
  const { id } = payload.user;
  if (!id) {
    throw new BadRequest("User ID is required to list notifications");
  }

  const notifications = await notificationRepository.update({
    payload: { isRead: true },
    criteria: { userId: id, isRead: false },
  });

  return notifications;
};

exports.markAsRead = async (payload) => {
  const { id } = payload.user;
  const notificationId = payload.params.id;
  if (!id) {
    throw new BadRequest("User ID is required to list notifications");
  }
  if (!notificationId) {
    throw new BadRequest("Notification ID is required to mark as read");
  }
  const notifications = await notificationRepository.update({
    payload: { isRead: true },
    criteria: { userId: id, isRead: false, id: notificationId },
  });

  return notifications;
};
