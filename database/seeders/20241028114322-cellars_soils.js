"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cellars = await queryInterface.sequelize.query(
      `SELECT id FROM cellars;`
    );
    const soils = await queryInterface.sequelize.query(`SELECT id FROM soils;`);
    await queryInterface.bulkInsert("cellars_soils", [
      { cellar_id: cellars[0][0].id, soil_id: soils[0][0].id },
      { cellar_id: cellars[0][1].id, soil_id: soils[0][1].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars_soils", null, {});
  },
};
