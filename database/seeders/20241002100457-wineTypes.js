"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wineTypes",
      [
        {
          wineType: "Vi Negre",
          description:
            "Elaborat a partir de raïms negres, el vi negre és conegut pel seu color fosc i sabors robusts. Varietats populars inclouen Cabernet Sauvignon, Merlot i Syrah.",
        },
        {
          wineType: "Vi Blanc",
          description:
            "Fet principalment de raïms blancs, el vi blanc és més lleuger i fresc. Varietats comunes són Chardonnay, Sauvignon Blanc i Riesling.",
        },
        {
          wineType: "Vi Rosat",
          description:
            "Aquest tipus de vi presenta un color rosat que prové d'un breu contacte amb les pells dels raïms negres. És fresc i afruitat, ideal per a climes càlids.",
        },
        {
          wineType: "Vi Brisat",
          description:
            "El vi brisat és un vi blanc elaborat amb raïm blanc que es fermenta amb les pells, aportant-li un color daurat i una textura rica.",
        },
        {
          wineType: "Vi Taronga",
          description:
            "El vi taronga és un tipus de vi rosat elaborat de manera que manté un color més intens, sovint aconseguit amb un temps de maceració més llarg.",
        },
        {
          wineType: "Vi Escumós",
          description:
            "Caracteritzat per la presència de bombolles, el vi escumós pot ser tant blanc com rosat. El Champagne i el Cava són exemples destacats.",
        },
        {
          wineType: "Vi Dolç",
          description:
            "El vi dolç és ric en sucre residual, oferint sabors dolços i afruitats. Varietats com el Moscatell i el Sauternes són exemples populars.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wineTypes", null, {});
  },
};
