"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "UsuarioPermissoes",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idUsuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Alunos",
            key: "id",
          },
        },
        idPermissao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Permissoes",
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
    await queryInterface.dropTable("UsuarioPermissoes");
  },
};
