"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wines_vintages",
      [
        {
          wineId: 1,
          vintageId: 1,
        },
        {
          wineId: 1,
          vintageId: 2,
        },

        // Echézeaux Grand Cru
        {
          wineId: 2,
          vintageId: 1,
        },
        {
          wineId: 2,
          vintageId: 3,
        },

        // Puligny-Montrachet
        {
          wineId: 3,
          vintageId: 3,
        },
        {
          wineId: 3,
          vintageId: 4,
        },

        // Domaine Leflaive Chevalier-Montrachet
        {
          wineId: 4,
          vintageId: 3,
        },
        {
          wineId: 4,
          vintageId: 5,
        },

        // Château Margaux
        {
          wineId: 5,
          vintageId: 5,
        },
        {
          wineId: 5,
          vintageId: 6,
        },

        // Pavillon Blanc du Château Margaux
        {
          wineId: 6,
          vintageId: 5,
        },
        {
          wineId: 6,
          vintageId: 7,
        },

        // Moët & Chandon Brut Impérial
        {
          wineId: 7,
          vintageId: 7,
        },
        {
          wineId: 7,
          vintageId: 8,
        },

        // Moët & Chandon Rosé Impérial
        {
          wineId: 8,
          vintageId: 7,
        },
        {
          wineId: 8,
          vintageId: 9,
        },

        // Bodegas Vega Sicilia Único
        {
          wineId: 9,
          vintageId: 9,
        },
        {
          wineId: 9,
          vintageId: 10,
        },

        // Valbuena 5° Año
        {
          wineId: 10,
          vintageId: 9,
        },
        {
          wineId: 10,
          vintageId: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wines_vintages", null, {});
  },
};
