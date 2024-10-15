"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "regions",
      [
        // Regiones para Itàlia
        {
          region: "Toscana",
          description:
            "Famosa pels seus vins Chianti, Toscana és considerada la regió vinícola més emblemàtica d'Itàlia.",
          countryId: 1, // ID del país Itàlia
        },
        {
          region: "Piemont",
          description:
            "La llar del Barolo i Barbaresco, Piemont és coneguda pels seus vins de qualitat excepcional.",
          countryId: 1,
        },
        {
          region: "Veneto",
          description:
            "Reconeguda pel seu Prosecco i Amarone, Veneto ofereix una varietat de vins únics.",
          countryId: 1,
        },

        // Regiones para França
        {
          region: "Bordeaux",
          description:
            "Famosa pels seus vins negres, Bordeaux és una de les regions vitivinícoles més prestigioses del món.",
          countryId: 2, // ID del país França
        },
        {
          region: "Champagne",
          description:
            "Només aquí es pot produir el veritable vi espumós Champagne, conegut per la seva elegància.",
          countryId: 2,
        },
        {
          region: "Borgonya",
          description:
            "Famosa pels seus vins de Pinot Noir i Chardonnay, Borgonya és un paradís per als amants del vi.",
          countryId: 2,
        },

        // Regiones para Espanya
        {
          region: "La Rioja",
          description:
            "La Rioja és famosa pels seus vins negres elaborats principalment amb raïm Tempranillo.",
          countryId: 3, // ID del país Espanya
        },
        {
          region: "Priorat",
          description:
            "Regió de vins negres de gran qualitat amb una forta concentració de sabor.",
          countryId: 3,
        },
        {
          region: "Catalunya",
          description:
            "Coneguda per la seva diversitat de vins, incloent Cava i vins blancs frescos.",
          countryId: 3,
        },

        // Regiones para Estados Unidos
        {
          region: "Napa Valley",
          description:
            "Conegut per la seva producció de vins de qualitat premium, especialment Cabernet Sauvignon.",
          countryId: 4, // ID del país EUA
        },
        {
          region: "Sonoma County",
          description:
            "Famous for its diverse climates and wide range of varietals.",
          countryId: 4,
        },
        {
          region: "Willamette Valley",
          description: "Reconeguda per la seva producció de Pinot Noir.",
          countryId: 4,
        },

        // Regiones para Argentina
        {
          region: "Mendoza",
          description:
            "La regió vinícola més important, famosa pel seu Malbec.",
          countryId: 5, // ID del país Argentina
        },
        {
          region: "Patagonia",
          description:
            "Regió emergent, coneguda per vins de qualitat amb frescor i elegància.",
          countryId: 5,
        },
        {
          region: "Salta",
          description:
            "Famosa per les seves vinyes a gran altitud, produint vins únics.",
          countryId: 5,
        },

        // Regiones para Chile
        {
          region: "Valle del Maipo",
          description:
            "Famosa pels seus vins negres, especialment Cabernet Sauvignon.",
          countryId: 6, // ID del país Xile
        },
        {
          region: "Valle de Colchagua",
          description:
            "Conegut per vins rics i estructurats, amb un gran potencial de guarda.",
          countryId: 6,
        },
        {
          region: "Valle de Casablanca",
          description:
            "Ideal per a la producció de vins blancs frescos, especialment Sauvignon Blanc.",
          countryId: 6,
        },

        // Regiones para Australia
        {
          region: "Barossa Valley",
          description:
            "Famosa pel seu Shiraz, amb una rica tradició vitivinícola.",
          countryId: 7, // ID del país Austràlia
        },
        {
          region: "Hunter Valley",
          description: "Coneguda per la producció de Semillon i Chardonnay.",
          countryId: 7,
        },
        {
          region: "Margaret River",
          description:
            "Regió emergent, famosa pels seus vins blancs i Cabernet Sauvignon.",
          countryId: 7,
        },

        // Regiones para Nueva Zelanda
        {
          region: "Marlborough",
          description: "Famosa pels seus Sauvignon Blanc frescos i aromàtics.",
          countryId: 8, // ID del país Nova Zelanda
        },
        {
          region: "Central Otago",
          description:
            "Coneguda pel seu Pinot Noir, amb condicions ideals per a aquesta varietat.",
          countryId: 8,
        },
        {
          region: "Hawke’s Bay",
          description:
            "Regió que produeix una varietat de vins, incloent Chardonnay i Merlot.",
          countryId: 8,
        },

        // Regiones para Sudáfrica
        {
          region: "Stellenbosch",
          description:
            "Famosa pels seus vins negres de qualitat, especialment Cabernet Sauvignon.",
          countryId: 9, // ID del país Àfrica del Sud
        },
        {
          region: "Franschhoek",
          description:
            "Coneguda per la seva diversitat de varietats i vins de gran qualitat.",
          countryId: 9,
        },
        {
          region: "Paternoster",
          description:
            "Regió emergent, coneguda per vins blancs frescos i innovadors.",
          countryId: 9,
        },

        // Regiones para Portugal
        {
          region: "Douro",
          description:
            "Famosa pel seu vi de port, amb un paisatge impressionant de terrasses.",
          countryId: 10, // ID del país Portugal
        },
        {
          region: "Alentejo",
          description:
            "Coneguda per la producció de vins tintos de gran sabor i complexitat.",
          countryId: 10,
        },
        {
          region: "Vinho Verde",
          description:
            "Regió coneguda pels seus vins blancs frescos i lleugers.",
          countryId: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
