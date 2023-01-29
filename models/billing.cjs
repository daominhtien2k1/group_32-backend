"use strict";

module.exports = (sequelize, DataTypes) => {
   const Billing = sequelize.define(
      "Billing",
      {
         startDate: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         endDate: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         isPaid: {
            type: DataTypes.BOOLEAN,
            default: false,
         },
         studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceRoom: {
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
   Billing.associate = function (models) {
      // associations can be defined here
   };
   return Billing;
};
