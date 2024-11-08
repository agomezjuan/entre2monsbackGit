"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("attribute_categories", [
      {
        name: "Aroma",
        description: "Describes the different wine aromas.",
        color: "#FF5733",
      },
      {
        name: "Flavor",
        description: "Describes the flavor notes.",
        color: "#33FF57",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attribute_categories", null, {});
  },
};
