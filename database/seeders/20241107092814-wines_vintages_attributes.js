"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wineVintages = await queryInterface.sequelize.query(
      `SELECT id FROM wine_vintages;`
    );
    const attributes = await queryInterface.sequelize.query(
      `SELECT id FROM attributes;`
    );

    await queryInterface.bulkInsert("wines_vintages_attributes", [
      {
        wine_vintage_id: wineVintages[0][0].id,
        attribute_id: attributes[0][0].id,
      },
      {
        wine_vintage_id: wineVintages[0][1].id,
        attribute_id: attributes[0][1].id,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wines_vintages_attributes", null, {});
  },
};
