"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("prices", [
      {
        purchasePrice: 20.99,
        salePrice: 30.99,
        wineVintageId: 1, // Referencia a una combinación válida de wine y vintage
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        purchasePrice: 25.99,
        salePrice: 35.99,
        wineVintageId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("prices", null, {});
  },
};
