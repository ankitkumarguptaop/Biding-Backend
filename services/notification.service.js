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
