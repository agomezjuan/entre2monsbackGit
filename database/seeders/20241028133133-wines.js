"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cellars = await queryInterface.sequelize.query(
      `SELECT id FROM cellars;`
    );
    const wineTypes = await queryInterface.sequelize.query(
      `SELECT id FROM wine_types;`
    );
    await queryInterface.bulkInsert("wines", [
      {
        name: "Chateau Margaux 2015",
        cellarId: cellars[0][0].id,
        wineTypeId: wineTypes[0][0].id,
        production: 1000,
      },
      {
        name: "Tignanello 2016",
        cellarId: cellars[0][1].id,
        wineTypeId: wineTypes[0][1].id,
        production: 1200,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wines", null, {});
  },
};
