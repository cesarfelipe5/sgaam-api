"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Planos", {
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
      duracao: {
        type: Sequelize.ENUM("Anual", "Semestral", "Trimestral", "Mensal"),
        allowNull: false,
        defaultValue: "Mensal",
      },
      // inicioVigencia: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // fimVigencia: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      precoPadrao: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Planos");
  },
};
