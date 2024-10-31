"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Elimina posibles duplicados antes de insertar
    await queryInterface.bulkDelete("dos", {
      name: [
        "DO Alella",
        "DO Pla de Bages",
        "DO Penedès",
        "DO Cava",
        "DO Médoc",
        "DO Saint-Émilion",
        "DO Champagne",
        "DO Aube",
      ],
    });

    // Insertar denominaciones de origen (DOs) en `dos`
    const dos = await queryInterface.bulkInsert(
      "dos",
      [
        {
          name: "DO Alella",
          description: "Denominación de Origen en Barcelona, Catalunya.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Pla de Bages",
          description: "Denominación de Origen en Barcelona, Catalunya.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Penedès",
          description: "Denominación de Origen en Penedès, Catalunya.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Cava",
          description: "Denominación de Origen en Penedès, famosa por el Cava.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Médoc",
          description: "Denominación de Origen en Bordeaux, Francia.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Saint-Émilion",
          description:
            "Denominación de Origen en Bordeaux, famosa por sus vinos tintos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Champagne",
          description:
            "Denominación de Origen en Champagne, famosa por el espumoso.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Aube",
          description: "Otra Denominación de Origen en Champagne, Francia.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: ["id"] }
    );

    // Continuar con la creación de las relaciones en `regions_dos` según sea necesario
    // ...
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions_dos", null, {});
    await queryInterface.bulkDelete("dos", null, {});
  },
};
