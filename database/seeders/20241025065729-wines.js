"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wines",
      [
        {
          name: "Romanée-Conti Grand Cru",
          description:
            "Un vino tinto elegante y estructurado de Pinot Noir, con una gran complejidad y un potencial de guarda notable.",
          production: 6000,
          vineyardAltitude: 300,
          img: "https://example.com/images/romanee_conti.png",
          tastingNotes: "Cereza madura, trufa, especias y un toque de regaliz.",
          cellarId: 1,
          sulphiteId: 1,
          wineTypeId: 1,
          vintages: [
            {
              vintageId: 1,
              stockData: {
                sku: "RCGC2018",
                quantityIn: 500,
                quantityOut: 0,
              },
              priceData: {
                purchasePrice: 12000.0,
                salePrice: 14000.0,
              },
            },
          ],
        },
        {
          name: "Domaine Leflaive Puligny-Montrachet",
          description:
            "Un vino blanco complejo y refinado de Chardonnay, conocido por su mineralidad y frescura.",
          production: 7500,
          vineyardAltitude: 320,
          img: "https://example.com/images/puligny_montrachet.png",
          tastingNotes:
            "Manzana verde, limón, flores blancas y un toque de almendra.",
          cellarId: 2,
          sulphiteId: 1,
          wineTypeId: 2,
          vintages: [
            {
              vintageId: 2,
              stockData: {
                sku: "DLPM2017",
                quantityIn: 1000,
                quantityOut: 200,
              },
              priceData: {
                purchasePrice: 200.0,
                salePrice: 250.0,
              },
            },
          ],
        },
        {
          name: "Château Margaux",
          description:
            "Un vino tinto de renombre mundial, hecho principalmente con Cabernet Sauvignon. Elegante, con gran capacidad de guarda.",
          production: 10000,
          vineyardAltitude: 50,
          img: "https://example.com/images/chateau_margaux.png",
          tastingNotes: "Grosella negra, cedro, tabaco y especias.",
          cellarId: 3,
          sulphiteId: 1,
          wineTypeId: 1,
          vintages: [
            {
              vintageId: 3,
              stockData: {
                sku: "CM2018",
                quantityIn: 800,
                quantityOut: 0,
              },
              priceData: {
                purchasePrice: 500.0,
                salePrice: 700.0,
              },
            },
          ],
        },
        {
          name: "Pétrus",
          description:
            "Un vino icónico de Merlot, caracterizado por su concentración e intensidad en boca.",
          production: 6000,
          vineyardAltitude: 35,
          img: "https://example.com/images/petrus.png",
          tastingNotes: "Ciruela, cacao, especias y un toque terroso.",
          cellarId: 4,
          sulphiteId: 1,
          wineTypeId: 1,
          vintages: [
            {
              vintageId: 4,
              stockData: {
                sku: "PT2018",
                quantityIn: 500,
                quantityOut: 0,
              },
              priceData: {
                purchasePrice: 3200.0,
                salePrice: 4500.0,
              },
            },
          ],
        },
        {
          name: "Moët & Chandon Brut Impérial",
          description:
            "El clásico Champagne Brut de Moët & Chandon, con frescura y elegancia.",
          production: 250000,
          vineyardAltitude: 150,
          img: "https://example.com/images/moet_imperial.png",
          tastingNotes: "Manzana verde, cítricos, y un toque de brioche.",
          cellarId: 5,
          sulphiteId: 1,
          wineTypeId: 3,
          vintages: [
            {
              vintageId: 5,
              stockData: {
                sku: "MCI2020",
                quantityIn: 20000,
                quantityOut: 1000,
              },
              priceData: {
                purchasePrice: 35.0,
                salePrice: 50.0,
              },
            },
          ],
        },
        {
          name: "Veuve Clicquot La Grande Dame",
          description:
            "Un Champagne de prestigio de Veuve Clicquot, con un perfil complejo y refinado.",
          production: 50000,
          vineyardAltitude: 160,
          img: "https://example.com/images/la_grande_dame.png",
          tastingNotes: "Pera madura, almendra y toques de miel.",
          cellarId: 6,
          sulphiteId: 1,
          wineTypeId: 3,
          vintages: [
            {
              vintageId: 6,
              stockData: {
                sku: "VCLGD2012",
                quantityIn: 5000,
                quantityOut: 200,
              },
              priceData: {
                purchasePrice: 180.0,
                salePrice: 250.0,
              },
            },
          ],
        },
        {
          name: "Marqués de Riscal Reserva",
          description:
            "Un vino clásico de Rioja, de Tempranillo, envejecido en barricas de roble.",
          production: 100000,
          vineyardAltitude: 470,
          img: "https://example.com/images/marques_riscal_reserva.png",
          tastingNotes: "Cereza negra, vainilla, y toques de especias.",
          cellarId: 7,
          sulphiteId: 1,
          wineTypeId: 1,
          vintages: [
            {
              vintageId: 7,
              stockData: {
                sku: "MRR2017",
                quantityIn: 30000,
                quantityOut: 1000,
              },
              priceData: {
                purchasePrice: 20.0,
                salePrice: 30.0,
              },
            },
          ],
        },
        {
          name: "Vega Sicilia Único",
          description:
            "El vino insignia de Vega Sicilia, conocido por su capacidad de guarda y complejidad.",
          production: 7000,
          vineyardAltitude: 750,
          img: "https://example.com/images/vega_sicilia_unico.png",
          tastingNotes: "Cassis, tabaco, cuero y un toque de trufa.",
          cellarId: 9,
          sulphiteId: 1,
          wineTypeId: 1,
          vintages: [
            {
              vintageId: 9,
              stockData: {
                sku: "VSU2010",
                quantityIn: 1500,
                quantityOut: 50,
              },
              priceData: {
                purchasePrice: 200.0,
                salePrice: 350.0,
              },
            },
          ],
        },
        {
          name: "Weingut Egon Müller Scharzhofberger Riesling",
          description:
            "Un Riesling alemán con gran acidez y un potencial de guarda notable, procedente del famoso viñedo Scharzhofberg.",
          production: 4000,
          vineyardAltitude: 300,
          img: "https://example.com/images/egon_mueller_riesling.png",
          tastingNotes: "Melocotón, miel, y una mineralidad afilada.",
          cellarId: 11,
          sulphiteId: 1,
          wineTypeId: 2,
          vintages: [
            {
              vintageId: 11,
              stockData: {
                sku: "EMSR2018",
                quantityIn: 700,
                quantityOut: 0,
              },
              priceData: {
                purchasePrice: 120.0,
                salePrice: 180.0,
              },
            },
          ],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wines", null, {});
  },
};
