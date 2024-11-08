"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const regions = await queryInterface.sequelize.query(
      `SELECT id FROM regions;`
    );
    const dos = await queryInterface.sequelize.query(`SELECT id FROM dos;`);
    await queryInterface.bulkInsert("regions_dos", [
      { region_id: regions[0][0].id, do_id: dos[0][0].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions_dos", null, {});
  },
};
