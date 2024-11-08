"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("countries", [
      { name: "France", description: "Country known for its wine heritage." },
      { name: "Italy", description: "Famous for a wide variety of wines." },
      { name: "Spain", description: "Renowned for its historical wineries." },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
