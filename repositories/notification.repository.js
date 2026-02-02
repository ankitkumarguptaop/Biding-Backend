const { Notifications } = require("../models");
const BaseRepository = require("./base.repository");

class NotificationRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new NotificationRepository({ model: Notifications });