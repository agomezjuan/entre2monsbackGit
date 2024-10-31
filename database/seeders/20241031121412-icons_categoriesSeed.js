"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "icon_categories",
      [
        {
          name: "Tipos de Vino",
          description:
            "Íconos que representan diferentes tipos de vino como tinto, blanco, rosado y espumoso.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Regiones Vinícolas",
          description:
            "Íconos que representan las principales regiones de producción de vino.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Aromas y Sabores",
          description:
            "Íconos que muestran diferentes aromas y sabores que se pueden encontrar en los vinos, como frutas, especias y roble.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Maridaje",
          description:
            "Íconos que indican el mejor maridaje para diferentes tipos de vinos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Accesorios de Vino",
          description:
            "Íconos de herramientas y accesorios para el vino, como copas, decantadores y sacacorchos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icon_categories", null, {});
  },
};
