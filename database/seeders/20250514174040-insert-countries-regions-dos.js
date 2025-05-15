"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar países
    const countries = await queryInterface.bulkInsert(
      "countries",
      [
        {
          name: "España",
          description: "Uno de los mayores productores de vino del mundo.",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Francia",
          description: "Famosa por sus vinos y sus regiones históricas.",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Italia",
          description:
            "Gran variedad de regiones vinícolas con tradición milenaria.",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Obtener IDs insertados (pueden variar según el dialecto, así que consultamos)
    const countriesData = await queryInterface.sequelize.query(
      `SELECT id, name FROM countries WHERE name IN ('España', 'Francia', 'Italia');`
    );
    const countryMap = Object.fromEntries(
      countriesData[0].map((c) => [c.name, c.id])
    );

    // Insertar regiones
    const regions = await queryInterface.bulkInsert(
      "regions",
      [
        // España
        {
          name: "La Rioja",
          description: "Región icónica del vino español.",
          country_id: countryMap["España"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ribera del Duero",
          description: "Famosa por sus tintos de Tempranillo.",
          country_id: countryMap["España"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Priorat",
          description: "Región montañosa con vinos potentes.",
          country_id: countryMap["España"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Francia
        {
          name: "Bordeaux",
          description:
            "Cuna de algunos de los vinos más prestigiosos del mundo.",
          country_id: countryMap["Francia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bourgogne",
          description:
            "Región histórica famosa por el Pinot Noir y Chardonnay.",
          country_id: countryMap["Francia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Champagne",
          description: "Región especializada en vinos espumosos.",
          country_id: countryMap["Francia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Italia
        {
          name: "Toscana",
          description: "Región famosa por Chianti y Brunello di Montalcino.",
          country_id: countryMap["Italia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Piamonte",
          description: "Hogar del Barolo y Barbaresco.",
          country_id: countryMap["Italia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Veneto",
          description: "Productor del conocido Prosecco.",
          country_id: countryMap["Italia"],
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    const regionData = await queryInterface.sequelize.query(
      `SELECT id, name FROM regions WHERE name IN (
        'La Rioja', 'Ribera del Duero', 'Priorat',
        'Bordeaux', 'Bourgogne', 'Champagne',
        'Toscana', 'Piamonte', 'Veneto'
      );`
    );
    const regionMap = Object.fromEntries(
      regionData[0].map((r) => [r.name, r.id])
    );

    // Insertar DOs
    const dos = await queryInterface.bulkInsert(
      "dos",
      [
        // España
        {
          name: "DOCa Rioja",
          description: "Denominación de Origen Calificada Rioja",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Ribera del Duero",
          description: "Denominación de Origen Ribera del Duero",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DOQ Priorat",
          description: "Denominación de Origen Calificada Priorat",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Francia
        {
          name: "AOC Bordeaux",
          description: "Appellation d’Origine Contrôlée Bordeaux",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "AOC Bourgogne",
          description: "Appellation Bourgogne pour Pinot Noir et Chardonnay",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "AOC Champagne",
          description: "Vinos espumosos de Champagne, método tradicional",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Italia
        {
          name: "DOCG Chianti",
          description:
            "Denominazione di Origine Controllata e Garantita Chianti",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DOCG Barolo",
          description:
            "Denominazione di Origine Controllata e Garantita Barolo",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DOC Prosecco",
          description: "Denominazione di Origine Controllata Prosecco",
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    const doData = await queryInterface.sequelize.query(
      `SELECT id, name FROM dos;`
    );
    const doMap = Object.fromEntries(doData[0].map((d) => [d.name, d.id]));

    // Asociar DOs a regiones (tabla intermedia regions_dos)
    await queryInterface.bulkInsert("regions_dos", [
      { region_id: regionMap["La Rioja"], do_id: doMap["DOCa Rioja"] },
      {
        region_id: regionMap["Ribera del Duero"],
        do_id: doMap["DO Ribera del Duero"],
      },
      { region_id: regionMap["Priorat"], do_id: doMap["DOQ Priorat"] },

      { region_id: regionMap["Bordeaux"], do_id: doMap["AOC Bordeaux"] },
      { region_id: regionMap["Bourgogne"], do_id: doMap["AOC Bourgogne"] },
      { region_id: regionMap["Champagne"], do_id: doMap["AOC Champagne"] },

      { region_id: regionMap["Toscana"], do_id: doMap["DOCG Chianti"] },
      { region_id: regionMap["Piamonte"], do_id: doMap["DOCG Barolo"] },
      { region_id: regionMap["Veneto"], do_id: doMap["DOC Prosecco"] },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regions_dos", null, {});
    await queryInterface.bulkDelete("dos", null, {});
    await queryInterface.bulkDelete("regions", null, {});
    await queryInterface.bulkDelete("countries", null, {});
  },
};
