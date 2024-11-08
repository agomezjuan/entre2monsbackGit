"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customers = await queryInterface.sequelize.query(
      `SELECT id FROM customers;`
    );
    const wineVintages = await queryInterface.sequelize.query(
      `SELECT id FROM wine_vintages;`
    );
    await queryInterface.bulkInsert("orders", [
      {
        customer_id: customers[0][0].id,
        wine_vintage_id: wineVintages[0][0].id,
        quantity: 5,
      },
      {
        customer_id: customers[0][1].id,
        wine_vintage_id: wineVintages[0][1].id,
        quantity: 3,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
