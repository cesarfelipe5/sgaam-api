"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("FormaPagamentos", [
      {
        nome: "Pix",
      },
      {
        nome: "Dinheiro",
      },
      {
        nome: "Cheque",
      },
      {
        nome: "Boleto",
      },
      {
        nome: "Cartão débito",
      },
      {
        nome: "Cartão 1 + 0",
      },
      {
        nome: "Cartão 1 + 1",
      },
      {
        nome: "Cartão 1 + 2",
      },
      {
        nome: "Cartão 1 + 3",
      },
      {
        nome: "Cartão 1 + 4",
      },
      {
        nome: "Cartão 1 + 5",
      },
      {
        nome: "Cartão 1 + 6",
      },
      {
        nome: "Cartão 1 + 7",
      },
      {
        nome: "Cartão 1 + 8",
      },
      {
        nome: "Cartão 1 + 9",
      },
      {
        nome: "Cartão 1 + 10",
      },
      {
        nome: "Cartão 1 + 11",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FormaPagamentos", {});
  },
};
