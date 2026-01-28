"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },

      description: {
        type: Sequelize.TEXT,
      },

      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      minBidPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
      },

      currentHighestBid: {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },

      currentWinnerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      startTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      endTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      status: {
        allowNull: false,
        type: Sequelize.ENUM("UPCOMING", "LIVE", "CLOSED", "EXPIRED"),
        defaultValue: "UPCOMING",
      },

      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Items");
  },
};
