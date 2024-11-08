"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("grapes", [
      {
        name: "Cabernet Sauvignon",
        description: "A full-bodied red grape variety.",
      },
      {
        name: "Sangiovese",
        description: "A popular grape used in Italian wines.",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("grapes", null, {});
  },
};
