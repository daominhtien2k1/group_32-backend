"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("RoomCategoriess", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         description: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         pricePerOneMonth: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         pricePerThreeMonth: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         pricePerSixMonth: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         deletedAt: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Rooms");
   },
};