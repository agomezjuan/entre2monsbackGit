"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cellars",
      [
        // Cellers per a Espanya
        {
          cellar: "Bodega del Río",
          description:
            "Bodega familiar situada en La Rioja, famosa per la producció de vins de qualitat.",
          distance: "10 km de la ciutat",
          regionId: 1, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Muga",
          description:
            "Bodega històrica famosa pels seus vins de gran caràcter i autenticitat.",
          distance: "5 km de Haro",
          regionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a França
        {
          cellar: "Château Margaux",
          description:
            "Una de les bodegues més prestigioses de Bordeaux, coneguda pels seus vins de qualitat excepcional.",
          distance: "5 km de Bordeaux",
          regionId: 2, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Château Lafite Rothschild",
          description:
            "Famosa pels seus vins de gran qualitat i un llegat de segles.",
          distance: "6 km de Pauillac",
          regionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a Itàlia
        {
          cellar: "Bodega Antinori",
          description:
            "Bodega històrica de Toscana, amb una tradició vitivinícola de més de 600 anys.",
          distance: "15 km de Florència",
          regionId: 3, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Gaja",
          description:
            "Famosa bodega en Piemont, coneguda pels seus Barbaresco.",
          distance: "10 km de Barbaresco",
          regionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a Argentina
        {
          cellar: "Bodega Catena Zapata",
          description:
            "Reconeguda bodega de Mendoza, famosa pel seu Malbec de gran qualitat.",
          distance: "20 km de la ciutat de Mendoza",
          regionId: 4, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Norton",
          description:
            "Bodega emblemàtica de Mendoza, coneguda per la seva diversitat de vins.",
          distance: "15 km de Luján de Cuyo",
          regionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a Xile
        {
          cellar: "Viña Santa Cruz",
          description:
            "Bodega que se centra en la producció de vins tintos i blancs de gran qualitat.",
          distance: "15 km de Santa Cruz",
          regionId: 5, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Viña Casa Silva",
          description:
            "Conocida por sus vinos de calidad y su enfoque en la sostenibilidad.",
          distance: "12 km de San Fernando",
          regionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a Austràlia
        {
          cellar: "Penfolds",
          description:
            "Una de les bodegues més antigues d'Austràlia, coneguda pel seu Grange.",
          distance: "25 km d'Adelaida",
          regionId: 6, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Henschke",
          description:
            "Bodega familiar que produeix vins de gran qualitat amb un enfocament artesanal.",
          distance: "30 km d'Adelaida",
          regionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Cellers per a Nova Zelanda
        {
          cellar: "Cloudy Bay",
          description:
            "Bodega reconeguda a Marlborough, famosa pels seus Sauvignon Blanc.",
          distance: "10 km de Blenheim",
          regionId: 7, // Assegura't que la ID coincideix amb la teva taula de regions
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Brancott Estate",
          description:
            "Pionera en la producció de Sauvignon Blanc a Nova Zelanda.",
          distance: "15 km de Blenheim",
          regionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cellars", null, {});
  },
};
