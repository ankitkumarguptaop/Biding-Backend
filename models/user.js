"use strict";

const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../configs/db");

const Users = sequelize.define(
  "Users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format",
        },
      },
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [6, 30],
          msg: "password length should lie between 6 to 30",
        },
      },
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
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
    modelName: "Users",
    tableName: "Users",
    paranoid: true,
  },
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
  });

  Users.hasMany(models.Bids, {
    foreignKey: "userId",
  });
};

module.exports = Users;
