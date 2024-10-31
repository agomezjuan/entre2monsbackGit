"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("days", [
      { name: "Lunes" },
      { name: "Martes" },
      { name: "Miércoles" },
      { name: "Jueves" },
      { name: "Viernes" },
      { name: "Sábado" },
      { name: "Domingo" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("days", null, {});
  },
};
