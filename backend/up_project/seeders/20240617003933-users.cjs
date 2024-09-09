'use strict';

const bycript = require("bcryptjs")
const uui = require("node:crypto")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const passHash = await bycript.hash("12345678", 8)
    const date = new Date()
    return await queryInterface.bulkInsert("users", [
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "Superadmin",
        nombre: "Superadmin",
        apellido: "Superadmin",
        nombre_usuario: "Superadmin",
        password: passHash,
        role_id: 1,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },
      {
        id_user: uui.randomUUID(),
        nombre_usuario: "user",
        nombre: "user",
        apellido: "user",
        nombre_usuario: "user",
        password: passHash,
        role_id: 3,
        createdAt: date,
        updatedAt: date
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('users', null, {});
  }
};
