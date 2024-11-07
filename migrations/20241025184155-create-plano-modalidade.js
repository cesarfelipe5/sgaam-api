"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "PlanoModalidades",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idModalidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Modalidades",
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
      },
      {
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlanoModalidades");
  },
};
