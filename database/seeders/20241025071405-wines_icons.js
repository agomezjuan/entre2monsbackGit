"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          wineId: 1,
          iconId: 1, // Vinyes Velles
        },
        {
          wineId: 1,
          iconId: 3, // Barrica de fusta
        },

        // Echézeaux Grand Cru
        {
          wineId: 2,
          iconId: 1, // Vinyes Velles
        },
        {
          wineId: 2,
          iconId: 3, // Barrica de fusta
        },

        // Puligny-Montrachet
        {
          wineId: 3,
          iconId: 4, // Ánfora de fang
        },
        {
          wineId: 3,
          iconId: 5, // Acer inox
        },

        // Domaine Leflaive Chevalier-Montrachet
        {
          wineId: 4,
          iconId: 2, // Vinyes Prefiloxèriques
        },
        {
          wineId: 4,
          iconId: 6, // Ecologic
        },

        // Château Margaux
        {
          wineId: 5,
          iconId: 3, // Barrica de fusta
        },
        {
          wineId: 5,
          iconId: 7, // Biodinàmic
        },

        // Pavillon Blanc du Château Margaux
        {
          wineId: 6,
          iconId: 5, // Acer inox
        },
        {
          wineId: 6,
          iconId: 6, // Ecologic
        },

        // Moët & Chandon Brut Impérial
        {
          wineId: 7,
          iconId: 5, // Acer inox
        },
        {
          wineId: 7,
          iconId: 7, // Biodinàmic
        },

        // Moët & Chandon Rosé Impérial
        {
          wineId: 8,
          iconId: 5, // Acer inox
        },
        {
          wineId: 8,
          iconId: 6, // Ecologic
        },

        // Bodegas Vega Sicilia Único
        {
          wineId: 9,
          iconId: 1, // Vinyes Velles
        },
        {
          wineId: 9,
          iconId: 3, // Barrica de fusta
        },

        // Valbuena 5° Año
        {
          wineId: 10,
          iconId: 1, // Vinyes Velles
        },
        {
          wineId: 10,
          iconId: 3, // Barrica de fusta
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
