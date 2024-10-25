"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          country: "França",
          description:
            "França és sinònim de prestigi i excel·lència vinícola, sent la llar d'algunes de les regions vinícoles més icòniques del món. Amb denominacions com Borgonya, Bordeus, Champagne i la Vall del Roine, França és coneguda per la seva enorme diversitat de vins: des dels elegants i delicats Chardonnays de Chablis, fins als potents i estructurats Cabernet Sauvignons de Bordeus. El seu clima variat, que abasta des de climes frescos i atlàntics fins a càlids i mediterranis, juntament amb una rica varietat de sòls, fa possible la producció d'alguns dels vins més apreciats i reconeguts internacionalment.",
        },
        {
          country: "Espanya",
          description:
            "Espanya és una potència vitivinícola mundial, amb una tradició vinícola que es remunta a milers d'anys. Amb regions de renom com La Rioja, Ribera del Duero, Priorat i Jerez, Espanya ofereix una àmplia gamma de vins, des dels negres robustos i amb cos fins als blancs frescos i vibrants. El país gaudeix d'una rica varietat de climes, des del fresc atlàntic fins al càlid mediterrani, que permet el cultiu de nombroses varietats de raïm, incloent les emblemàtiques Tempranillo, Garnatxa i Albariño. Els seus sòls, que varien des de calcàries i argiles fins a sòls volcànics, contribueixen a l'únic caràcter dels seus vins.",
        },
        {
          country: "Alemanya",
          description:
            "Alemanya és mundialment famosa pels seus vins blancs, en particular els Rieslings, que han situat aquest país en el mapa vinícola internacional. Les regions vinícoles com Mosel, Rheingau i Pfalz són conegudes per la seva capacitat de produir vins frescos, aromàtics i elegants, sovint amb una acidesa vibrant i un equilibri extraordinari entre dolçor i frescor. El clima fresc del país, juntament amb els sòls de pissarra, proporciona un entorn ideal per al desenvolupament de vins de gran longevitat i complexitat aromàtica, especialment en les zones properes als rius.",
        },
        {
          country: "Catalunya",
          description:
            "Catalunya és una regió vinícola de gran riquesa i diversitat, reconeguda mundialment per la seva producció de vins de qualitat i el seu esperit innovador. Amb denominacions d'origen com el Priorat, el Penedès, Montsant i la Terra Alta, Catalunya ofereix una àmplia gamma de vins, des dels robustos i mineralitzats vins negres del Priorat, fins als frescos i aromàtics blancs del Penedès. A més, és el bressol del Cava, el vi escumós per excel·lència d'Espanya. La diversitat de climes, que va des del mediterrani fins al continental, i la varietat de sòls, que inclouen pissarres, calcàries i argiles, proporcionen un paratge únic per a l'elaboració de vins amb caràcter, elegància i profunditat. Catalunya destaca per combinar la seva història vinícola mil·lenària amb un enfocament modern i avantguardista, creant vins que reflecteixen tant el passat com el futur de la viticultura.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
