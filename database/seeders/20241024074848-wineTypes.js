"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wineTypes",
      [
        {
          wineType: "Negre",
          description:
            "Elaborat amb raïms negres, amb la pell durant la fermentació, donant estructura, tanins i color fosc. És ideal per a carns i plats amb cos.",
        },
        {
          wineType: "Blanc",
          description:
            "Fet amb raïm blanc o negre sense la pell. Són frescos i sovint amb acidesa marcada. Perfectes per a mariscs, peixos i formatges suaus.",
        },
        {
          wineType: "Rosat",
          description:
            "Elaborat amb raïms negres, però amb una maceració curta de la pell, donant-li el seu característic color rosa. Molt versàtil per maridar amb plats lleugers.",
        },
        {
          wineType: "Escumós",
          description:
            "Vins amb bombolles per la segona fermentació (com el cava o el champagne). Frescos i elegants, ideals per aperitius o celebracions.",
        },
        {
          wineType: "Postres",
          description:
            "Fet amb raïms molt madurs o tècniques especials per mantenir el sucre residual. Són vins molt dolços, com el vi de postres o de gel.",
        },
        {
          wineType: "Fortificat",
          description:
            "Vins als quals se'ls ha afegit alcohol durant o després de la fermentació (com el porto o el xerès). Són intensos i sovint dolços.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wineTypes", null, {});
  },
};
