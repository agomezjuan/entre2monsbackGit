"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wines = await queryInterface.sequelize.query(`SELECT id FROM wines;`);
    await queryInterface.bulkInsert("wine_vintages", [
      { wine_id: wines[0][0].id, vintage_id: 2015 },
      { wine_id: wines[0][1].id, vintage_id: 2016 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wine_vintages", null, {});
  },
};
