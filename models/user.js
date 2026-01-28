"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 30],
            msg: "name length should lie between 3 to 30",
          },
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "invalid email format",
          },
        },
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 30],
            msg: "password length should lie between 6 to 30",
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("ADMIN", "USER"),
        defaultValue: "USER",
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
      modelName: "Users",
      tableName: "Users",
      paranoid: true,
    }
  );

  Users.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  Users.prototype.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  Users.associate = (models) => {
    Users.hasMany(models.Items, {
      foreignKey: "createdBy",
      as: "items",
    });

    Users.hasMany(models.Bids, {
      foreignKey: "userId",
      as: "bids",
    });
  };

  return Users;
};
