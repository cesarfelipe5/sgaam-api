"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Pagamentos",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        dataPagamento: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        valor: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        observacao: {
          type: Sequelize.TEXT,
        },
        dataVencimento: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        pago: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        idUsuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Usuarios",
            key: "id",
          },
        },
        idPlanoAluno: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "PlanoAlunos",
            key: "id",
          },
        },
        idFormaPagamento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "FormaPagamentos",
            key: "id",
          },
        },
      },
      {
        timestamps: true,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Pagamentos");
  },
};
