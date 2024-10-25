"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          wineId: 1,
          vintageId: 1,
          grapeId: 1, // Pinot Noir
          stockId: 1,
          priceId: 1,
        },
        {
          wineId: 1,
          vintageId: 2,
          grapeId: 1, // Pinot Noir
          stockId: 2,
          priceId: 2,
        },

        // Echézeaux Grand Cru (añadas con distintas uvas)
        {
          wineId: 2,
          vintageId: 1,
          grapeId: 1, // Pinot Noir
          stockId: 3,
          priceId: 3,
        },
        {
          wineId: 2,
          vintageId: 3,
          grapeId: 2, // Pinot Noir con Syrah
          stockId: 4,
          priceId: 4,
        },

        // Puligny-Montrachet
        {
          wineId: 3,
          vintageId: 3,
          grapeId: 3, // Chardonnay
          stockId: 5,
          priceId: 5,
        },
        {
          wineId: 3,
          vintageId: 4,
          grapeId: 3, // Chardonnay
          stockId: 6,
          priceId: 6,
        },

        // Domaine Leflaive Chevalier-Montrachet
        {
          wineId: 4,
          vintageId: 3,
          grapeId: 3, // Chardonnay
          stockId: 7,
          priceId: 7,
        },
        {
          wineId: 4,
          vintageId: 5,
          grapeId: 3, // Chardonnay
          stockId: 8,
          priceId: 8,
        },

        // Château Margaux
        {
          wineId: 5,
          vintageId: 5,
          grapeId: 4, // Cabernet Sauvignon
          stockId: 9,
          priceId: 9,
        },
        {
          wineId: 5,
          vintageId: 6,
          grapeId: 5, // Cabernet Sauvignon, Merlot
          stockId: 10,
          priceId: 10,
        },

        // Pavillon Blanc du Château Margaux
        {
          wineId: 6,
          vintageId: 5,
          grapeId: 6, // Sauvignon Blanc
          stockId: 11,
          priceId: 11,
        },
        {
          wineId: 6,
          vintageId: 7,
          grapeId: 6, // Sauvignon Blanc
          stockId: 12,
          priceId: 12,
        },

        // Moët & Chandon Brut Impérial
        {
          wineId: 7,
          vintageId: 7,
          grapeId: 7, // Chardonnay, Pinot Noir
          stockId: 13,
          priceId: 13,
        },
        {
          wineId: 7,
          vintageId: 8,
          grapeId: 8, // Chardonnay, Pinot Meunier
          stockId: 14,
          priceId: 14,
        },

        // Moët & Chandon Rosé Impérial
        {
          wineId: 8,
          vintageId: 7,
          grapeId: 9, // Pinot Noir, Pinot Meunier
          stockId: 15,
          priceId: 15,
        },
        {
          wineId: 8,
          vintageId: 9,
          grapeId: 10, // Chardonnay, Pinot Noir, Pinot Meunier
          stockId: 16,
          priceId: 16,
        },

        // Bodegas Vega Sicilia Único
        {
          wineId: 9,
          vintageId: 9,
          grapeId: 11, // Tempranillo, Cabernet Sauvignon
          stockId: 17,
          priceId: 17,
        },
        {
          wineId: 9,
          vintageId: 10,
          grapeId: 11, // Tempranillo, Cabernet Sauvignon
          stockId: 18,
          priceId: 18,
        },

        // Valbuena 5° Año
        {
          wineId: 10,
          vintageId: 9,
          grapeId: 12, // Tempranillo, Merlot
          stockId: 19,
          priceId: 19,
        },
        {
          wineId: 10,
          vintageId: 10,
          grapeId: 12, // Tempranillo, Merlot
          stockId: 20,
          priceId: 20,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
