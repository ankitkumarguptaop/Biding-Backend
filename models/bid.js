"use strict";

module.exports = (sequelize, DataTypes) => {
  const Bids = sequelize.define(
    "Bids",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bidAmount: {
        allowNull: false,
        type: DataTypes.DECIMAL(12, 2),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
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
      as: "user",
    });

    Bids.belongsTo(models.Items, {
      foreignKey: "itemId",
      as: "item",
    });
  };

  return Bids;
};
