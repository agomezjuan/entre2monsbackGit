"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          country: "Itàlia",
          description:
            "Itàlia és el líder mundial en producció de vi, amb més de 400 varietats de raïm cultivades a través del país. Regions com Toscana són famoses pels seus Chianti i Brunello di Montalcino, mentre que el Piemont destaca pel seu Barolo. La rica història vitivinícola d'Itàlia, que es remunta a milers d'anys, es combina amb tècniques modernes per produir vins de gran qualitat i diversitat.",
        },
        {
          country: "França",
          description:
            "França és coneguda com la patria dels vins clàssics, amb regions emblemàtiques com Champagne, Bordeaux i Borgonya. Cada regió ofereix un estil únic: Champagne per a vins espumosos, Bordeaux per a vins negres rics i complexes, i Borgonya per a vins elegants de Pinot Noir i Chardonnay. La tradició vinícola francesa i les seves estrictes denominacions d'origen controlades (AOC) asseguren la qualitat i la singularitat dels seus vins.",
        },
        {
          country: "Espanya",
          description:
            "Espanya és famosa per la seva diversitat vitivinícola, amb una gran varietat de climes i terroirs que permeten cultivar una àmplia gamma de raïms. Regions com La Rioja són reconegudes pels seus vins negres intensos i aromàtics, mentre que el Priorat destaca per la seva producció de vins de qualitat excepcional. Espanya és també la llar del vi de Cava, un vi espumós elaborat principalment a la regió de Penedès.",
        },
        {
          country: "Estats Units",
          description:
            "Els Estats Units, amb Napa Valley com a icona, són reconeguts per la seva qualitat de vins, especialment els Cabernet Sauvignon i Chardonnay. Napa Valley és famosa no només pels seus vins sinó també per la seva bellesa paisatgística. A més, regions com Oregon i Washington estan guanyant prestigi per la seva producció de Pinot Noir i altres varietats. La innovació i la creativitat són els motors de la indústria vitivinícola nord-americana.",
        },
        {
          country: "Argentina",
          description:
            "Argentina és famosa pel seu Malbec, especialment de la regió de Mendoza, que representa més del 70% de la producció de vi del país. El clima sec i les altituds elevades de Mendoza permeten produir vins rics i concentrats amb una gran fruita. A més del Malbec, Argentina també produeix excel·lents vins blancs, com el Torrontés, que és conegut pel seu aroma floral i frescor.",
        },
        {
          country: "Xile",
          description:
            "Xile ha emergit com un dels països productors de vi més importants del món, amb una geografia única que proporciona un clima ideal per al cultiu de raïm. Regions com la Vall del Maipo i la Vall de Colchagua són famoses pels seus vins negres, especialment Cabernet Sauvignon i Carménère. La diversitat de microclimes i terroirs a Xile permet una àmplia gamma de varietats i estils de vi.",
        },
        {
          country: "Austràlia",
          description:
            "Austràlia és coneguda pels seus vins de varietats com Shiraz i Chardonnay. Regions com Barossa Valley i Hunter Valley són famoses per la seva innovació i la qualitat dels seus vins. Barossa Valley, en particular, és famosa pels seus Shiraz intensos i rics. Els productors australians han adoptat tècniques modernes, combinant tradicions antigues amb un enfocament innovador.",
        },
        {
          country: "Nova Zelanda",
          description:
            "Nova Zelanda ha guanyat una reputació mundial pels seus Sauvignon Blanc frescos i aromàtics, especialment de la regió de Marlborough. Els vins neozelandesos són coneguts per la seva qualitat i característiques distintives, amb un creixement constant de la seva indústria vitivinícola. A més del Sauvignon Blanc, Nova Zelanda també produeix excel·lents Pinot Noir, especialment de regions com Central Otago.",
        },
        {
          country: "Àfrica del Sud",
          description:
            "Àfrica del Sud és coneguda per la seva diversitat vitivinícola i la seva rica història. Regions com Stellenbosch i Franschhoek ofereixen vins de qualitat que combinen influències locals i europees. El Chenin Blanc i el Pinotage són dues varietats distintives de la regió, amb el Pinotage sent un raïm únic de South Africa que combina característiques de Pinot Noir i Cinsault.",
        },
        {
          country: "Portugal",
          description:
            "Portugal és famós pel seu vi de port, especialment de la regió del Douro, on els terrasses d'arbres i les riberes del riu creen un paisatge espectacular. A més del vi de port, Portugal també produeix vins blancs i negres de gran qualitat en regions com Alentejo i Vinho Verde, amb varietats autòctones que aporten una singularitat única a la seva producció.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
