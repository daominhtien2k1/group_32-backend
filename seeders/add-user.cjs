"use strict";

const { hashString } = require("../src/middlewares/bcrypt.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Users",
         [
            {
               email: "admin@gmail.com",
               password: hashString("123123"),
               name: "Admin",
               role: "admin",
               status: "active",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               email: "tiennh@gmail.com",
               password: hashString("123123"),
               name: "Nguyen Huu Tien",
               role: "student",
               studentCode: "20194385",
               status: "active",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               email: "tiendm@gmail.com",
               password: hashString("123123"),
               name: "Dao Minh Tien",
               role: "student",
               studentCode: "20194386",
               status: "active",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               email: "tienvd@gmail.com",
               password: hashString("123123"),
               name: "Vu Dinh Tien",
               role: "student",
               studentCode: "20194384",
               status: "active",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               email: "thuongnv@gmail.com",
               password: hashString("123123"),
               name: "Nguyen Van Thuong",
               role: "student",
               studentCode: "20194380",
               status: "active",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      ),

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};
