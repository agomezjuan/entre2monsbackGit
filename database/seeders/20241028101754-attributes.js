"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM attribute_categories;`
    );

    await queryInterface.bulkInsert("attributes", [
      {
        name: "Fruity",
        description: "A fruity wine aroma.",
        attribute_category_id: categories[0][0].id,
      },
      {
        name: "Crisp",
        description: "A fresh and vibrant flavor.",
        attribute_category_id: categories[0][1].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attributes", null, {});
  },
};
