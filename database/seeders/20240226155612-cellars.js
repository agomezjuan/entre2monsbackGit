"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cellars",
      [
        // 1. La Rioja
        {
          cellar: "Bodega del Río",
          description:
            "Una bodega familiar situada en La Rioja, famosa por la producción de vino tinto.",
          distance: "10 km de la ciudad",
          regionId: 1, // La Rioja
          soilId: 1, // Argilós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Muga",
          description:
            "Bodega histórica famosa por sus vinos de gran carácter.",
          distance: "5 km de Haro",
          regionId: 1,
          soilId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 2. Bordeaux
        {
          cellar: "Château Margaux",
          description:
            "Una de las bodegas más prestigiosas de Bordeaux, conocida por su calidad excepcional.",
          distance: "5 km de Bordeaux",
          regionId: 2, // Bordeaux
          soilId: 3, // Calcari
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Château Lafite Rothschild",
          description:
            "Famosa por sus vinos de alta calidad y un legado de siglos.",
          distance: "6 km de Pauillac",
          regionId: 2,
          soilId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 3. Borgoña
        {
          cellar: "Domaine de la Romanée-Conti",
          description:
            "Bodega icónica en Borgoña, famosa por sus Pinot Noir de altísima calidad.",
          distance: "2 km de Vosne-Romanée",
          regionId: 3, // Borgoña
          soilId: 3, // Calcari
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Château de Pommard",
          description:
            "Conocida por sus vinos de alta calidad y su enfoque en la sostenibilidad.",
          distance: "10 km de Beaune",
          regionId: 3,
          soilId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 4. Catalunya
        {
          cellar: "Bodega Torres",
          description:
            "Bodega emblemática que combina tradició i innovació a Catalunya.",
          distance: "30 km de Barcelona",
          regionId: 4, // Catalunya
          soilId: 2, // Sorrenyós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Cava Gramona",
          description:
            "Reconocida bodega de cava, famosa por su enfoque en la calidad.",
          distance: "25 km de Sant Sadurní d’Anoia",
          regionId: 4,
          soilId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 5. Douro
        {
          cellar: "Quinta do Noval",
          description:
            "Bodega icónica a la región del Douro, famosa por su vino de port.",
          distance: "8 km de Pinhão",
          regionId: 5, // Douro
          soilId: 8, // Vulcànic
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Taylor’s Port",
          description:
            "Conocida por su vino de port de alta calidad y una rica historia.",
          distance: "10 km de Vila Nova de Gaia",
          regionId: 5,
          soilId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 6. Valle de Colchagua
        {
          cellar: "Viña Santa Cruz",
          description:
            "Bodega que se enfoca en la producción de vinos tintos y blancos.",
          distance: "15 km de Santa Cruz",
          regionId: 6, // Valle de Colchagua
          soilId: 7, // Gres
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Viña Casa Silva",
          description:
            "Conocida por sus vinos de calidad y su enfoque en la sostenibilidad.",
          distance: "12 km de San Fernando",
          regionId: 6,
          soilId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 7. Mendoza
        {
          cellar: "Bodega Catena Zapata",
          description:
            "Reconocida bodega de Mendoza, famosa por su Malbec de alta calidad.",
          distance: "20 km de la ciudad de Mendoza",
          regionId: 7, // Mendoza
          soilId: 6, // Humífer
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Norton",
          description:
            "Bodega emblemática de Mendoza, conocida por su diversidad de vinos.",
          distance: "15 km de Luján de Cuyo",
          regionId: 7,
          soilId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 8. Napa Valley
        {
          cellar: "Napa Valley Winery",
          description:
            "Bodega emblemática de Napa Valley, especialitzada en Cabernet Sauvignon.",
          distance: "3 km de Napa",
          regionId: 8, // Napa Valley
          soilId: 5, // França
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Stag’s Leap Wine Cellars",
          description:
            "Famosa por su Cabernet Sauvignon y su historia en la industria del vino.",
          distance: "10 km de Napa",
          regionId: 8,
          soilId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 9. Barossa Valley
        {
          cellar: "Penfolds",
          description:
            "Una de las bodegas más antiguas de Australia, conocida por su Grange.",
          distance: "25 km de Adelaida",
          regionId: 9, // Barossa Valley
          soilId: 4, // Calcari
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Henschke",
          description:
            "Bodega familiar que produce vinos de alta calidad con un enfoque artesanal.",
          distance: "30 km de Adelaida",
          regionId: 9,
          soilId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 10. Marlborough
        {
          cellar: "Cloudy Bay",
          description:
            "Bodega reconocida a Marlborough, famosa por sus Sauvignon Blanc.",
          distance: "10 km de Blenheim",
          regionId: 10, // Marlborough
          soilId: 9, // Pedregós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Brancott Estate",
          description:
            "Pionera en la producción de Sauvignon Blanc en Nueva Zelanda.",
          distance: "15 km de Blenheim",
          regionId: 10,
          soilId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 11. Stellenbosch
        {
          cellar: "Klein Constantia",
          description:
            "Bodega histórica a África del Sur, famosa por su Vin de Constance.",
          distance: "15 km de Ciudad del Cabo",
          regionId: 11, // Stellenbosch
          soilId: 10, // Marga
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Delaire Graff",
          description:
            "Bodega y destino turístico en Stellenbosch, conocida por sus vinos premium.",
          distance: "10 km de Stellenbosch",
          regionId: 11,
          soilId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 12. Priorat
        {
          cellar: "Bodega Clos Mogador",
          description:
            "Bodega icónica en el Priorat, conocida por su enfoque en la calidad.",
          distance: "8 km de Gratallops",
          regionId: 12, // Priorat
          soilId: 1, // Argilós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Scala Dei",
          description:
            "Bodega histórica en el Priorat, conocida por su tradición y calidad.",
          distance: "12 km de la ciudad",
          regionId: 12,
          soilId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 13. Piemont
        {
          cellar: "Gaja",
          description: "Famosa bodega en Piemont, conocida por su Barbaresco.",
          distance: "10 km de Barbaresco",
          regionId: 13, // Piemont
          soilId: 2, // Sorrenyós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Pio Cesare",
          description:
            "Bodega emblemática en Piemont, famosa por sus vinos de alta calidad.",
          distance: "5 km de Alba",
          regionId: 13,
          soilId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 14. Veneto
        {
          cellar: "Bodega Allegrini",
          description:
            "Bodega famosa por sus vinos de Valpolicella, especialmente el Amarone.",
          distance: "15 km de Verona",
          regionId: 14, // Veneto
          soilId: 2, // Sorrenyós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Tommasi",
          description:
            "Reconocida bodega en el Veneto, con un enfoque en la tradición y la innovación.",
          distance: "12 km de Valpolicella",
          regionId: 14,
          soilId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // 15. Toscana
        {
          cellar: "Bodega Antinori",
          description:
            "Bodega histórica de Toscana, con una tradición vitivinícola de más de 600 años.",
          distance: "15 km de Florencia",
          regionId: 15, // Toscana
          soilId: 2, // Sorrenyós
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cellar: "Bodega Castello di Ama",
          description:
            "Bodega situada en Chianti, conocida por sus vinos de alta calidad.",
          distance: "30 km de Siena",
          regionId: 15,
          soilId: 2,
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
