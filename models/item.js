"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");

const Items = sequelize.define(
  "Items",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [3, 100],
          msg: "title must be between 3 to 100 characters",
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    minBidPrice: {
      allowNull: false,
      type: Sequelize.DECIMAL(12, 2),
    },
    startTime: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    endTime: {
      allowNull: false,
      type: Sequelize.DATE,
      validate: {
        isAfterStart(value) {
          if (this.startTime && value <= this.startTime) {
            throw new Error("endTime must be after startTime");
          }
        },
      },
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM("upcoming", "active", "closed"),
      defaultValue: "upcoming",
    },
    createdBy: {
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
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "Items",
    tableName: "Items",
    paranoid: true,
  }
);


Items.associate = (models) => {
  Items.belongsTo(models.Users, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Items.hasMany(models.Bids, {
    foreignKey: "itemId",
  });
};

module.exports = Items;
