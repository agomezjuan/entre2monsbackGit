"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "regions",
      [
        {
          region: "Borgonya",
          description:
            "Una de les regions vinícoles més prestigioses de França, coneguda pels seus vins negres elegants de Pinot Noir i els seus blancs refinats de Chardonnay. La seva diversitat de terrers i el seu clima fresc permeten l'elaboració de vins subtils i amb una gran capacitat de guarda.",
          countryId: 1,
        },
        {
          region: "Bordeus",
          description:
            "Una de les regions vinícoles més prestigioses de França, coneguda pels seus vins negres elegants de Pinot Noir i els seus blancs refinats de Chardonnay. La seva diversitat de terrers i el seu clima fresc permeten l'elaboració de vins subtils i amb una gran capacitat de guarda.",
          countryId: 1,
        },
        {
          region: "Champagne",
          description:
            "Situada al nord de França, és famosa pels seus vins escumosos, el Champagne. Gràcies al seu clima fresc i els sòls de guix, produeix vins refinats i amb una acidesa vibrant que són sinònim de luxe i celebració.",
          countryId: 1,
        },
        {
          region: "La Rioja",
          description:
            "Una de les regions vinícoles més antigues i prestigioses d'Espanya, coneguda per la seva excel·lent producció de vins negres de Tempranillo, sovint envellits en bótes de roure, que aporten complexitat i caràcter.",
          countryId: 2,
        },
        {
          region: "Ribera del Duero",
          description:
            "Famosa pels seus vins negres intensos i estructurats elaborats principalment amb Tempranillo. El clima extrem i l'altitud de les vinyes donen lloc a vins potents, amb tanins marcats i un gran potencial d'envelliment.",
          countryId: 2,
        },
        {
          region: "Rueda",
          description:
            "Rueda és una de les regions vinícoles més importants d'Espanya per a la producció de vins blancs. Situada a la vall del Duero, és coneguda pel seu raïm autòcton Verdejo, que produeix vins frescos, aromàtics i amb una acidesa viva. A més de Verdejo, també s'hi cultiven Sauvignon Blanc i Viura. Els vins de Rueda són valorats per la seva frescor i la seva capacitat per a maridar amb una gran varietat de plats mediterranis.",
          countryId: 2,
        },
        {
          region: "Mosel",
          description:
            "Famosa pels seus vins blancs de Riesling, és una de les regions més prestigioses d'Alemanya. Els seus sòls de pissarra i el clima fresc produeixen vins delicats amb una acidesa vibrant i una gran capacitat d'envelliment.",
          countryId: 3,
        },
        {
          region: "Rheingau",
          description:
            "Una de les regions clàssiques per al Riesling, amb vins que són coneguts per la seva elegància, estructura i intensitat aromàtica. Els sòls de pissarra i quars aporten mineralitat als vins.",
          countryId: 3,
        },
        {
          region: "Pfalz",
          description:
            "Situada al sud-oest d'Alemanya, és coneguda per la seva diversitat de vins, des de Rieslings frescos fins a vins negres com el Pinot Noir. El clima és més càlid que en altres regions, la qual cosa permet una major maduració del raïm.",
          countryId: 3,
        },
        {
          region: "Priorat",
          description:
            "Una de les regions més reconegudes de Catalunya, famosa pels seus vins negres intensos i profunds, elaborats principalment amb Garnatxa i Carinyena. Els seus sòls de llicorella donen als vins una gran mineralitat i estructura.",

          countryId: 4,
        },
        {
          region: "Penedès",
          description:
            "Famosa per la producció de Cava, el vi escumós emblemàtic de Catalunya, a més de vins blancs frescos i aromàtics. Els sòls calcaris i el clima mediterrani afavoreixen la qualitat i frescor dels seus vins.",

          countryId: 4,
        },
        {
          region: "Montsant",
          description:
            "A prop del Priorat, Montsant és coneguda per produir vins negres amb cos, molt expressius, també elaborats amb Garnatxa i Carinyena. Els seus vins tenen un bon equilibri entre fruita i estructura.",

          countryId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
