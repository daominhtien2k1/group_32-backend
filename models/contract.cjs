"use strict";

module.exports = (sequelize, DataTypes) => {
   const Contract = sequelize.define(
      "Contract",
      {
         studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         status: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         price: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceInternet: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceElectric: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceWater: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceParking: {
            type: DataTypes.INTEGER,
            allowNull: true,
         }
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Contract.associate = function (models) {
      // associations can be defined here
   };
   return Contract;
};
