const { Users } = require("../models");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new UserRepository({ model: Users });