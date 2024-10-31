"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener los IDs de Catalunya y Francia desde la tabla countries
    const countries = await queryInterface.sequelize.query(
      `SELECT id, name FROM countries WHERE name IN ('Catalunya', 'Francia');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const catalunya = countries.find((country) => country.name === "Catalunya");
    const francia = countries.find((country) => country.name === "Francia");

    if (!catalunya || !francia) {
      throw new Error(
        "Catalunya y Francia deben estar presentes en la tabla countries antes de ejecutar esta seed."
      );
    }

    await queryInterface.bulkInsert("regions", [
      {
        name: "Barcelona",
        description: "Región de producción vinícola en Catalunya.",
        country_id: catalunya.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Penedès",
        description: "Otra famosa región vinícola en Catalunya.",
        country_id: catalunya.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bordeaux",
        description:
          "Famosa región de vinos en Francia, conocida por sus tintos.",
        country_id: francia.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Champagne",
        description: "Región de Francia famosa por el vino espumoso.",
        country_id: francia.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
