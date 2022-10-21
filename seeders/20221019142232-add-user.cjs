'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      email: 'admin1@gmai.com',
      password: '123123',
      name: 'Admin 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin2@gmai.com',
      password: '123123',
      name: 'Admin 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
