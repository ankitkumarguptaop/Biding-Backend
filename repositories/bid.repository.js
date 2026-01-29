const { Bids } = require("../models");
const BaseRepository = require("./base.repository");

class BidRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new BidRepository({ model: Bids });