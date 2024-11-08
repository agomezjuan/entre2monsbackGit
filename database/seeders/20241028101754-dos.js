"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("dos", [
      { name: "DO Rioja", description: "Famous for red wines from Spain." },
      { name: "DO Bordeaux", description: "Renowned wine region in France." },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("dos", null, {});
  },
};
