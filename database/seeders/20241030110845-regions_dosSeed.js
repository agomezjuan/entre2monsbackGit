"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener IDs de las regiones y denominaciones de origen existentes
    const regions = await queryInterface.sequelize.query(
      `SELECT id, name FROM regions;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const dos = await queryInterface.sequelize.query(
      `SELECT id, name FROM dos;`, // Asegúrate de que el nombre de la tabla sea "dos" en tu base de datos
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Verificar que los datos existen
    if (!regions.length || !dos.length) {
      console.error("Error: Regiones o DOs no se encontraron.");
      return;
    }

    // Asociaciones de ejemplo: dos DOs para cada región
    const regionDosData = [
      {
        region_id: regions.find((region) => region.name === "Barcelona")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Alella")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Barcelona")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Pla de Bages")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Penedès")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Penedès")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Penedès")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Cava")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Bordeaux")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Médoc")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Bordeaux")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Saint-Émilion")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Champagne")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Champagne")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        region_id: regions.find((region) => region.name === "Champagne")?.id,
        do_id: dos.find((doItem) => doItem.name === "DO Aube")?.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Filtrar entradas válidas
    const filteredData = regionDosData.filter(
      (item) => item.region_id && item.do_id
    );

    // Insertar solo asociaciones válidas en la tabla intermedia
    await queryInterface.bulkInsert("regions_dos", filteredData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions_dos", null, {});
  },
};
