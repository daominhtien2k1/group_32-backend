'use strict';

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        default: 'pending',
        allowNull: false
      }
    },
    {
      deletedAt: 'deletedAt',
      paranoid: true,
      timestamps: true,
    },
  );
  Request.associate = function (models) {
    // associations can be defined here
  };
  return Request;
};