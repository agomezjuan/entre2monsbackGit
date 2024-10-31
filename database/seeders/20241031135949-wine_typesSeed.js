"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "wine_types",
      [
        {
          name: "Tinto",
          description:
            "Vino elaborado con uvas tintas, caracterizado por su color oscuro y gran cuerpo.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Blanco",
          description:
            "Vino fresco y ligero, generalmente elaborado con uvas blancas.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Rosado",
          description:
            "Vino de color rosado, con características de frescura y suavidad.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Espumoso",
          description:
            "Vino con burbujas, generalmente asociado al Champagne y Cava.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Dulce",
          description:
            "Vino con un alto contenido de azúcar, ideal para postres.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wine_types", null, {});
  },
};
