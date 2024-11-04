"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("wines", [
      {
        name: "Merlot Reserve",
        vineyard_altitude: 300.5,
        img: "https://example.com/images/merlot.jpg",
        production: 1000,
        description: "A fine Merlot from a high-altitude vineyard.",
        cellar_id: 1, // Ajusta al ID correspondiente en tu tabla `cellars`
        wine_type_id: 1, // Ajusta al ID correspondiente en tu tabla `wine_types`
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Chardonnay Classic",
        vineyard_altitude: 150.0,
        img: "https://example.com/images/chardonnay.jpg",
        production: 750,
        description: "Classic Chardonnay with a rich aroma.",
        cellar_id: 2, // Ajusta al ID correspondiente en tu tabla `cellars`
        wine_type_id: 2, // Ajusta al ID correspondiente en tu tabla `wine_types`
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Agrega más vinos según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wines", null, {});
  },
};
