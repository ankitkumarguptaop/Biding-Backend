const User = require("../models/user");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new UserRepository({ model: User });