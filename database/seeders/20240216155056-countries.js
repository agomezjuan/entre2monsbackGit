"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          country: "Espanya",
          description:
            "Espanya és coneguda per la seva rica tradició vitivinícola que abasta diverses regions, com La Rioja i el Priorat, on es produeixen vins de qualitat excepcional, tant negres com blancs. Els vins espanyols són apreciats per la seva complexitat i varietat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "França",
          description:
            "França és la patria dels vins clàssics i una de les regions vitivinícoles més prestigioses del món. Regions com Bordeaux, Borgonya i Champagne són reconegudes internacionalment per la seva qualitat, varietat i tècniques tradicionals de vinificació.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Itàlia",
          description:
            "Itàlia és coneguda pels seus vins icònics com el Chianti, Barolo i Prosecco. Cada regió del país, des de la Toscana fins al Piemont, ofereix una varietat única de raïms i estils de vi, reflectint la rica herència cultural italiana.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Portugal",
          description:
            "Portugal té una llarga història de producció de vi, famosa especialment pel seu vi de port, que es produeix a la regió del Douro. La diversitat de microclimes del país permet una àmplia gamma de varietats de raïm i estils de vi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Xile",
          description:
            "Xile ha emergit com un dels països productors de vi més importants del món, amb regions com la Vall del Maipo i la Vall de Colchagua que produeixen vins amb una expressió única gràcies al seu clima i terroir favorables.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Argentina",
          description:
            "Argentina és reconeguda pel seu Malbec, especialment de la regió de Mendoza. El país combina les tradicions vitivinícoles europees amb un terreny i un clima excepcional, produint vins intensos i amb gran personalitat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Estats Units",
          description:
            "Els Estats Units, amb Napa Valley com a icona, han guanyat prestigi en el món del vi, produint vins de qualitat premium. La diversitat de regions vitivinícoles, des de Califòrnia fins a Oregon, ofereix una gamma variada de varietats i estils.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Austràlia",
          description:
            "Austràlia és coneguda pels seus vins de varietats com el Shiraz i el Chardonnay. Regions com Barossa Valley i Hunter Valley són famoses per la seva innovació i la qualitat dels seus vins, que han guanyat reconeixement internacional.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Nova Zelanda",
          description:
            "Nova Zelanda ha guanyat una reputació mundial pels seus Sauvignon Blanc i Pinot Noir. Les condicions climàtiques ideals, combinades amb tècniques de vinificació modernes, han ajudat a posicionar el país com un productor de vins de qualitat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Àfrica del Sud",
          description:
            "Àfrica del Sud és coneguda per la seva diversitat vitivinícola i la seva rica història. Regions com Stellenbosch i Franschhoek ofereixen vins de qualitat que combinen influències locals i europees, amb una varietat de raïms que inclouen Chenin Blanc i Pinotage.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
