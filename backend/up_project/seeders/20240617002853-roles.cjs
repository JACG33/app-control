'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const date = new Date()
    return await queryInterface.bulkInsert("roles", [
      {
        role_name: "superadmin",
        createdAt: date,
        updatedAt: date
      },
      {
        role_name:"admin",
        createdAt: date,
        updatedAt: date
      },
      {
        role_name:"user",
        createdAt: date,
        updatedAt: date
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('roles', null, {});
  }
};
