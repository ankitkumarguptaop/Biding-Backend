"use strict";

module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define(
    "Items",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 100],
            msg: "title must be between 3 to 100 characters",
          },
        },
      },

      description: {
        type: DataTypes.TEXT,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      minBidPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(12, 2),
        validate: {
          min: {
            args: [1],
            msg: "minimum bid price must be greater than 0",
          },
        },
      },

      currentHighestBid: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      currentWinnerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      startTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      endTime: {
        allowNull: false,
        type: DataTypes.DATE,
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
        type: DataTypes.ENUM("UPCOMING", "LIVE", "CLOSED", "EXPIRED"),
        defaultValue: "UPCOMING",
      },
      createdBy: {
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

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      modelName: "Items",
      tableName: "Items",
      paranoid: true,
    }
  );

  Items.beforeCreate((item) => {
    item.currentHighestBid = item.minBidPrice;
  });

  Items.associate = (models) => {
    Items.belongsTo(models.Users, {
      foreignKey: "createdBy",
      as: "creator",
    });

    Items.belongsTo(models.Users, {
      foreignKey: "currentWinnerId",
      as: "currentWinner",
    });

    Items.hasMany(models.Bids, {
      foreignKey: "itemId",
      as: "bids",
    });
  };

  return Items;
};

