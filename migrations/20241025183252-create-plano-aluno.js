"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "PlanoAlunos",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        idPlano: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Planos",
            key: "id",
          },
        },
        isExperimental: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlanoAlunos");
  },
};
