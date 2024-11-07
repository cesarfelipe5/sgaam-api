"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Telefones",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        tipo: {
          type: Sequelize.ENUM("Comercial", "Residencial", "Celular"),
          defaultValue: "Residencial",
          allowNull: false,
        },
        numero: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        idAluno: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Alunos",
            key: "id",
          },
        },
      },
      {
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Telefones");
  },
};
