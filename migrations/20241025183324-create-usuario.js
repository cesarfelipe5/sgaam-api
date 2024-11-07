"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Usuarios",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING(100),
          allowNullL: false,
        },
        senha: {
          type: Sequelize.STRING(100),
          allowNullL: false,
        },
      },
      {
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuarios");
  },
};
