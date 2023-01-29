"use strict";

module.exports = (sequelize, DataTypes) => {
   const Room = sequelize.define(
      "Room",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         buildingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         roomCategoryId: {
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
   Room.associate = function (models) {
      // associations can be defined here
      Room.belongsTo(models.RoomCategory, {
         as: "roomCategory",
         foreignKey: "roomCategoryId",
         targetKey: "id",
      });
   };
   return Room;
};
