"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("wine_types", [
      { name: "Red Wine", description: "Wines made from red grapes." },
      { name: "White Wine", description: "Wines made from white grapes." },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wine_types", null, {});
  },
};
