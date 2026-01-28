class BaseRepository {
  constructor({ model }) {
    this.model = model;
  }

  async create(payload, options = {}) {
    const instance = await this.model.create(payload, options);
    return instance && instance.toJSON();
  }

  async update({ payload, criteria, options }) {
    return await this.model.update(payload, { where: criteria, ...options });
  }

  async findAll({
    criteria = {},
    include = [],
    order,
    attributes = {},
    offset = 0,
    paranoid = true,
    limit = null,
  }) {
    let findQuery = {
      where: criteria,
      include,
      attributes,
      offset,
      order,
      paranoid,
      subQuery: false,
    };
    if (limit) findQuery.limit = limit;
    return await this.model.findAll(findQuery);
  }
  async findAndCountAll({ criteria, include = [], offset = 0, limit = 10 }) {
    return await this.model.findAndCountAll({
      where: criteria,
      include,
      offset,
      limit,
    });
  }

  async findOne(criteria, include = [], attributes = {}, options = {}) {
    return await this.model.findOne({
      where: criteria,
      include,
      attributes,
      ...options,
    });
  }

  async createBulk(payload, options) {
    return await this.model.bulkCreate(payload, options);
  }

  async count({ criteria = {}, options = {} }) {
    return await this.model.count({ where: criteria, ...options });
  }
  async softDelete({ criteria, options = null }) {
    const response = await this.model.destroy({ where: criteria }, options);
    return response;
  }
}

module.exports = BaseRepository;