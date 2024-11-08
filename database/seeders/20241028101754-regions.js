"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = await queryInterface.sequelize.query(
      `SELECT id FROM countries;`
    );

    await queryInterface.bulkInsert("regions", [
      { name: "Bordeaux", countryId: countries[0][0].id },
      { name: "Tuscany", countryId: countries[0][1].id },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
