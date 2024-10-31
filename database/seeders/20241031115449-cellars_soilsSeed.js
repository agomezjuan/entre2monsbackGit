"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cellars_soils",
      [
        {
          cellar_id: 1, // ID de la bodega "Bodega Tradicional"
          soil_id: 1, // ID del suelo "Calizo"
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 1,
          soil_id: 3, // ID del suelo "Granítico"
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 2, // ID de la bodega "Bodega Moderna"
          soil_id: 2, // ID del suelo "Arcilloso"
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 2,
          soil_id: 4, // ID del suelo "Arenoso"
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 3, // ID de la bodega "Bodega de Montaña"
          soil_id: 5, // ID del suelo "Limoso"
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 3,
          soil_id: 3, // ID del suelo "Granítico"
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars_soils", null, {});
  },
};
