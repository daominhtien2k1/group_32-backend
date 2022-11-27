"use strict";

const { hashString } = require("../src/middlewares/bcrypt.cjs");

module.exports = (sequelize, DataTypes) => {
   const Building = sequelize.define(
      "Building",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         address: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         //  hooks: {
         //     beforeCreate: async (Building) => {
         //        Building.password = hashString(Building.password);
         //     },
         //  },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Building.associate = function (models) {
      // associations can be defined here
   };
   return Building;
};
