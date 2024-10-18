"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("stocks", [
      {
        sku: "CS-2018-001",
        quantityIn: 100,
        quantityOut: 30,
        wineVintageId: 1, // Cabernet Sauvignon 2018
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sku: "CH-2019-002",
        quantityIn: 150,
        quantityOut: 50,
        wineVintageId: 2, // Chardonnay 2019
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
