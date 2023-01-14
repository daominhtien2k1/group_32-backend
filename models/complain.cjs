'use strict';

module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define(
    'Complain',
    {
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
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
  Complain.associate = function (models) {
    // associations can be defined here
  };
  return Complain;
};