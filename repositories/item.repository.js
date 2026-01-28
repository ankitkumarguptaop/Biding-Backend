const Items = require("../models/item");
const BaseRepository = require("./base.repository");

class ItemRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new ItemRepository({ model: Items });