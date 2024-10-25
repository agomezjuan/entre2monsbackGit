"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wines_labels",
      [
        {
          wineId: 1, // Romanée-Conti Grand Cru
          labelId: 1, // Sec
        },
        {
          wineId: 1,
          labelId: 5, // Primàries
        },
        {
          wineId: 1,
          labelId: 10, // Alta (Acidesa)
        },
        {
          wineId: 2, // Echézeaux Grand Cru
          labelId: 2, // Semi-sec
        },
        {
          wineId: 2,
          labelId: 6, // Secundàries
        },
        {
          wineId: 2,
          labelId: 8, // Baixa (Acidesa)
        },
        {
          wineId: 3, // Puligny-Montrachet
          labelId: 1, // Sec
        },
        {
          wineId: 3,
          labelId: 12, // Mitjà (Cos)
        },
        {
          wineId: 4, // Domaine Leflaive Chevalier-Montrachet
          labelId: 2, // Semi-sec
        },
        {
          wineId: 4,
          labelId: 7, // Terciàries
        },
        {
          wineId: 5, // Château Margaux
          labelId: 4, // Dolç
        },
        {
          wineId: 5,
          labelId: 14, // Baixa (Taninicitat)
        },
        {
          wineId: 6, // Pavillon Blanc du Château Margaux
          labelId: 3, // Semi-dolç
        },
        {
          wineId: 6,
          labelId: 10, // Alta (Acidesa)
        },
        {
          wineId: 7, // Moët & Chandon Brut Impérial
          labelId: 7, // Terciàries
        },
        {
          wineId: 7,
          labelId: 19, // Alt (Alcohol)
        },
        {
          wineId: 8, // Moët & Chandon Rosé Impérial
          labelId: 1, // Sec
        },
        {
          wineId: 8,
          labelId: 17, // Baix (Alcohol)
        },
        {
          wineId: 9, // Bodegas Vega Sicilia Único
          labelId: 24, // Criança
        },
        {
          wineId: 9,
          labelId: 22, // Llarga (Persistència)
        },
        {
          wineId: 10, // Valbuena 5° Año
          labelId: 24, // Criança
        },
        {
          wineId: 10,
          labelId: 23, // Reserva/Gran Reserva
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wines_labels", null, {});
  },
};
