"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "regions",
      [
        // Espanya
        {
          region: "La Rioja",
          description:
            "Famosa per els seus vins negres elaborats principalment amb raïm Tempranillo.",
          countryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Priorat",
          description:
            "Regió de vins negres de gran qualitat amb una forta concentració de sabor.",
          countryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Catalunya",
          description:
            "Coneguda per la seva diversitat de vins, incloent Cava i vins blancs frescos.",
          countryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // França
        {
          region: "Bordeaux",
          description:
            "Reconeguda per la seva producció de vins negres i blancs de gran prestigi.",
          countryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Borgonya",
          description: "Famous per els seus vins de Pinot Noir i Chardonnay.",
          countryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Champagne",
          description:
            "Només aquí es pot produir el veritable vi espumós Champagne.",
          countryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Itàlia
        {
          region: "Toscana",
          description: "Famosa per vins com Chianti i Brunello di Montalcino.",
          countryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Piemont",
          description:
            "Regió coneguda pel seu Barolo i Barbaresco, vins de gran qualitat.",
          countryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Veneto",
          description:
            "Coneguda pel seu Prosecco i Amarone, amb una rica tradició vitivinícola.",
          countryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Portugal
        {
          region: "Douro",
          description:
            "Regió famosa pel vi de port, amb un paisatge impressionant de terrasses.",
          countryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Alentejo",
          description:
            "Conocida por la producción de vinos tintos de gran sabor y complejidad.",
          countryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Vinho Verde",
          description:
            "Regió coneguda pels seus vins blancs frescos i lleugers.",
          countryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Xile
        {
          region: "Valle del Maipo",
          description:
            "Famosa pels seus vins negres, especialment Cabernet Sauvignon.",
          countryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Valle de Colchagua",
          description:
            "Conegut per vins rics i estructurats, amb un gran potencial de guarda.",
          countryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Valle de Casablanca",
          description:
            "Ideal per a la producció de vins blancs frescos, especialment Sauvignon Blanc.",
          countryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Argentina
        {
          region: "Mendoza",
          description:
            "La regió vinícola més important, famosa pel seu Malbec.",
          countryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Patagonia",
          description:
            "Regió emergent, coneguda per vins de qualitat amb frescor i elegància.",
          countryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Salta",
          description:
            "Famosa per les seves vinyes a gran altitud, produint vins únics.",
          countryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Estats Units
        {
          region: "Napa Valley",
          description:
            "Conegut per la seva producció de vins de qualitat premium, especialment Cabernet Sauvignon.",
          countryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Sonoma County",
          description:
            "Famous for its diverse climates and wide range of varietals.",
          countryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Willamette Valley",
          description: "Reconeguda per la seva producció de Pinot Noir.",
          countryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Austràlia
        {
          region: "Barossa Valley",
          description:
            "Famosa pel seu Shiraz, amb una rica tradició vitivinícola.",
          countryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Hunter Valley",
          description: "Coneguda per la producció de Semillon i Chardonnay.",
          countryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Margaret River",
          description:
            "Regió emergent, famosa pels seus vins blancs i Cabernet Sauvignon.",
          countryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Nova Zelanda
        {
          region: "Marlborough",
          description: "Famosa pels seus Sauvignon Blanc frescos i aromàtics.",
          countryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Central Otago",
          description:
            "Coneguda pel seu Pinot Noir, amb condicions ideals per a aquesta varietat.",
          countryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Hawke’s Bay",
          description:
            "Regió que produeix una varietat de vins, incloent Chardonnay i Merlot.",
          countryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Àfrica del Sud
        {
          region: "Stellenbosch",
          description:
            "Famosa pels seus vins negres de qualitat, especialment Cabernet Sauvignon.",
          countryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Franschhoek",
          description:
            "Coneguda per la seva diversitat de varietats i vins de gran qualitat.",
          countryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          region: "Paternoster",
          description:
            "Regió emergent, coneguda per vins blancs frescos i innovadors.",
          countryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
