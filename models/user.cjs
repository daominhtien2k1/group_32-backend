'use strict';

const { hashString } = require("../src/middlewares/bcrypt.cjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = hashString(user.password);
        }
      },
    },
    {
      deletedAt: 'deletedAt',
      paranoid: true,
      timestamps: true,
    },
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};