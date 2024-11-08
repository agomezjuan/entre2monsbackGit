"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wineVintages = await queryInterface.sequelize.query(
      `SELECT id FROM wine_vintages;`
    );

    await queryInterface.bulkInsert("stocks", [
      { sku: "SKU001", quantity: 100, wine_vintage_id: wineVintages[0][0].id },
      { sku: "SKU002", quantity: 200, wine_vintage_id: wineVintages[0][1].id },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
