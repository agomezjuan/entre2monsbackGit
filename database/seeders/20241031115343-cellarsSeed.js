"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cellars",
      [
        {
          name: "Bodega Tradicional",
          distance: 12.5,
          description: "Una bodega con una larga tradición en la región.",
          awards: "Premio a la mejor bodega 2021",
          history:
            "Fundada en 1950, ha mantenido la tradición vitivinícola en la región.",
          do_id: 1, // ID de la DO asociada
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bodega Moderna",
          distance: 8.0,
          description: "Bodega que combina técnicas modernas con tradición.",
          awards: "Premio a la innovación en viticultura 2020",
          history: "Inició en 2000, se destaca por sus técnicas avanzadas.",
          do_id: 2, // ID de la DO asociada
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bodega de Montaña",
          distance: 25.3,
          description: "Bodega ubicada en altitud, con microclima único.",
          awards: "Medalla de oro en vinos de altura 2019",
          history: "Desde 1995, ha producido vinos de características únicas.",
          do_id: 3, // ID de la DO asociada
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars", null, {});
  },
};
