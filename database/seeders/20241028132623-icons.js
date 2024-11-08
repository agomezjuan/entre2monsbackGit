"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subcategories = await queryInterface.sequelize.query(
      `SELECT id FROM icon_subcategories;`
    );

    await queryInterface.bulkInsert("icons", [
      {
        name: "Cabernet Icon",
        icon_path: "/path/to/cabernet.svg",
        subcategoryId: subcategories[0][0].id,
      },
      {
        name: "Chardonnay Icon",
        icon_path: "/path/to/chardonnay.svg",
        subcategoryId: subcategories[0][1].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icons", null, {});
  },
};
