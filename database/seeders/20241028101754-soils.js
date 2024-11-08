"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("soils", [
      { name: "Clay", description: "Dense soil, retains moisture." },
      { name: "Limestone", description: "Contributes to wine's minerality." },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("soils", null, {});
  },
};
