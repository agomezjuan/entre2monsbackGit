"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("labels", [
      {
        id: 1,
        name: "Floral",
        description:
          "La gamma floral pot incloure una varietat d'aromes que van des de roses i violetes en vins blancs joves, fins a notes de jazmín i flors d'acàcia en vins més madurs. Aquesta característica aporta frescor i sofisticació, sovint present en vins blancs i alguns rosats.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Àcid",
        description:
          "L'acidesa és un factor clau en l'equilibri del vi. Pot variar des de notes cítriques, com llimona i taronja, fins a tocs més agressius de pomelo. Els vins amb bona acidesa són refrescants i poden millorar la capacitat de maridatge amb plats rics.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Dolç",
        description:
          "Els vins dolços es caracteritzen per la seva elevada concentració de sucres, que poden venir de la sobre maduració de les grapes o de tècniques com la passificació. Notables en vins de postres, poden presentar notes de mel, caramel o fruits secs, aportant una sensació rica i reconfortant al paladar.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Cítric",
        description:
          "Les notes cítriques inclouen llimona, taronja i llima, i són habituals en vins blancs frescos. Aquestes aromes aporten vitalitat i frescor, i solen ser presents en vins joves que busquen una expressió immediata de fruita.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Afruitat",
        description:
          "Aquesta gamma inclou aromes de fruits com cireres, prunes, poma i pera. Els vins afruitats són sovint accessibles i agradables, amb notes fresques i madures que evoquen la fruita fresca o fruita confitada, depenent del nivell de maduració de les grapes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Cos Ple",
        description:
          "El cos ple indica una estructura rica i robusta, sovint associat amb vins negres i alguns blancs fermentats en bótes. Aquests vins poden presentar una sensació d'uniformitat en boca, aportant una textura sedosa i un final llarg.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Suau",
        description:
          "Un vi suau és aquell que presenta una textura elegant i agradable al paladar. Les seves tanins són suaus i ben integrats, la qual cosa facilita una experiència de tast confortable, ideal per a aquells que busquen una opció més delicada.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Mitjà Cos",
        description:
          "El cos mitjà ofereix un bon equilibri entre la lleugeresa i la profunditat. És versàtil, ideal per a diversos maridatges i adequat tant per a ocasions informals com per a àpats més elaborats, proporcionant una sensació de plenitud sense ser aclaparador.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Complex",
        description:
          "La complexitat en un vi indica una rica varietat d'aromes i sabors. Pot incloure notes de fusta, espècies, fruits i florals, que es desenvolupen a mesura que el vi oxida. Aquest tipus de vi és apreciat per la seva capacitat d'evolucionar en el temps i oferir noves experiències a cada glop.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Elegant",
        description:
          "L'elegància es reflecteix en l'harmonia entre tots els components del vi, incloent l'acidesa, la dolçor i el cos. Un vi elegant sol ser subtil, amb un acabat suau que deixa una impressió duradora sense ser aclaparador, ideal per a moments especials.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("labels", null, {});
  },
};
