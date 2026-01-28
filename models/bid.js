"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");

const Bids = sequelize.define(
  "Bids",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bidAmount: {
      allowNull: false,
      type: Sequelize.DECIMAL(12, 2),
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    itemId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "Bids",
    tableName: "Bids",
  }
);

Bids.associate = (models) => {
  Bids.belongsTo(models.Users, {
    foreignKey: "userId",
  });

  Bids.belongsTo(models.Items, {
    foreignKey: "itemId",
  });
};

module.exports = Bids;
