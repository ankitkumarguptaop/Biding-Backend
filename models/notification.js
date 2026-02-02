"use strict";

module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "Notifications",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Notifications",
      tableName: "Notifications",
    },
  );

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Notifications;
};
