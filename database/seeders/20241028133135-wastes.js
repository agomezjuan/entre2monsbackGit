"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const stocks = await queryInterface.sequelize.query(
      `SELECT id FROM stocks;`
    );
    await queryInterface.bulkInsert("wastes", [
      {
        stock_id: stocks[0][0].id,
        quantity: 2,
        reason: "Damage during transport",
      },
      { stock_id: stocks[0][1].id, quantity: 1, reason: "Defect in bottle" },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wastes", null, {});
  },
};
