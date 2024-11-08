"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wineVintages = await queryInterface.sequelize.query(
      `SELECT id FROM wine_vintages;`
    );
    await queryInterface.bulkInsert("prices", [
      {
        purchase_price: 25.5,
        sell_price: 40.0,
        benefit_margin: 56.86,
        wine_vintage_id: wineVintages[0][0].id,
      },
      {
        purchase_price: 30.0,
        sell_price: 50.0,
        benefit_margin: 66.67,
        wine_vintage_id: wineVintages[0][1].id,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("prices", null, {});
  },
};
