'use strict';

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