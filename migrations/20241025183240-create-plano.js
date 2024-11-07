"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Planos",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        inicioVigencia: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        fimVigencia: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        precoPadrao: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Planos");
  },
};
