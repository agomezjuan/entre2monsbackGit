"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("icon_categories", [
      { name: "Grapes", description: "Icons related to grape types." },
      { name: "Regions", description: "Icons for wine-producing regions." },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icon_categories", null, {});
  },
};
