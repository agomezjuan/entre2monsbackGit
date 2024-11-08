"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const suppliers = await queryInterface.sequelize.query(
      `SELECT id FROM suppliers;`
    );
    await queryInterface.bulkInsert("supplier_delivery_details", [
      { minPurchase: 100.0, deliveryTax: 15.0, supplierId: suppliers[0][0].id },
      { minPurchase: 200.0, deliveryTax: 20.0, supplierId: suppliers[0][1].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_delivery_details", null, {});
  },
};
