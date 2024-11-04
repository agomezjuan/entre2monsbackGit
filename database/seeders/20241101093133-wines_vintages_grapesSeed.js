"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("wine_vintage_grapes", [
      {
        wine_id: 1, // ID del vino en la tabla `wines`
        vintage_id: 1, // ID del vintage en la tabla `vintages`
        grape_id: 1, // ID de la uva en la tabla `grapes`
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wine_id: 1,
        vintage_id: 2,
        grape_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wine_id: 2,
        vintage_id: 1,
        grape_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Agrega más relaciones según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wine_vintage_grapes", null, {});
  },
};
