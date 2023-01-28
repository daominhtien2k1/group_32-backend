"use strict";

module.exports = (sequelize, DataTypes) => {
   const RoomCategory = sequelize.define(
      "RoomCategory",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         description: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         pricePerOneMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         pricePerThreeMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         pricePerSixMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   RoomCategory.associate = function (models) {
      // associations can be defined here
   };
   return RoomCategory;
};
