"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wineVintages = await queryInterface.sequelize.query(
      `SELECT id FROM wine_vintages;`
    );
    const grapes = await queryInterface.sequelize.query(
      `SELECT id FROM grapes;`
    );
    await queryInterface.bulkInsert("wine_vintage_grapes", [
      { wine_vintage_id: wineVintages[0][0].id, grape_id: grapes[0][0].id },
      { wine_vintage_id: wineVintages[0][1].id, grape_id: grapes[0][1].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wine_vintage_grapes", null, {});
  },
};
