"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        nome: "Admin",
        email: "admin@admin.com.br",
        senha: "$2a$10$YbvhDAsuxE2WFsQfivBY.O7Oeo/X5N8EonaIxvUHW0NHX8PfycRse",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", {});
  },
};
