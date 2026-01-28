"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
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
        },
        status: {
          allowNull: false,
          type: Sequelize.ENUM("upcoming", "active", "closed"),
          defaultValue: "upcoming",
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
      },
      {
        paranoid: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Items");
  },
};
