"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM icon_categories;`
    );

    await queryInterface.bulkInsert("icon_subcategories", [
      { name: "Red Grapes", categoryId: categories[0][0].id },
      { name: "White Grapes", categoryId: categories[0][0].id },
      { name: "European Regions", categoryId: categories[0][1].id },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icon_subcategories", null, {});
  },
};
