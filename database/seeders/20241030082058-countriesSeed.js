"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("countries", [
      {
        name: "Catalunya",
        description:
          "Catalunya es conocida por su rica tradición vinícola, con denominaciones como Priorat y Penedès que destacan por sus vinos únicos.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Francia",
        description:
          "Francia es el país vinícola por excelencia, famoso por regiones como Burdeos, Borgoña y Champaña, cada una con su estilo y variedad distintivos.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("countries", {
      name: ["Catalunya", "Francia"],
    });
  },
};
