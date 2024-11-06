"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("countries", [
      {
        name: "Catalunya",
        description:
          "Catalunya és una regió amb una llarga tradició vitivinícola que es remunta a temps antics. Amb una diversitat de terrenys i microclimes, ofereix una gran varietat de vins que reflecteixen la riquesa del seu territori. Les dotze denominacions d'origen catalanes, com el Priorat, Penedès, Empordà i Montsant, són reconegudes internacionalment per la seva qualitat i singularitat. El clima mediterrani, combinat amb la influència de les muntanyes i la proximitat del mar, crea condicions òptimes per al cultiu de varietats de raïm tant autòctones com internacionals. Catalunya és també el bressol del cava, un vi escumós elaborat seguint el mètode tradicional. La passió per la vinya i el compromís amb la innovació i la sostenibilitat fan de Catalunya una destinació imprescindible per als amants del vi i l'enoturisme.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "França",
        description:
          "França és reconeguda mundialment com una de les regions vitivinícoles més importants i influents de la història. Amb una tradició que es remunta a segles enrere, el país ofereix una rica diversitat de vins que reflecteixen la varietat dels seus terrenys i climes. Les prestigioses regions com Bordeus, Borgonya, Champagne, la Vall del Roine i Alsàcia són famoses per produir vins de qualitat excepcional. El clima variat de França, que abasta des de zones mediterrànies fins a continentals, permet el cultiu d'una àmplia gamma de varietats de raïm, tant autòctones com internacionals. França és també el bressol de molts mètodes tradicionals de vinificació, incloent-hi el méthode champenoise per als vins escumosos. La dedicació a l'art de la viticultura i el compromís amb la qualitat fan de França una destinació essencial per als amants del vi i l'enoturisme.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Espanya",
        description:
          "Espanya és una de les principals regions vitivinícoles del món, amb una tradició que es remunta a mil·lennis enrere. El país compta amb una gran diversitat de climes i terrenys, des dels paisatges atlàntics de Galícia fins als sòls àrids d'Andalusia, passant per les altituds de Castella i Lleó i les costes mediterrànies. Aquesta varietat permet el cultiu d'una àmplia gamma de varietats de raïm, tant autòctones com internacionals. Regions vitivinícoles com La Rioja, Ribera del Duero, Priorat, Rueda i Jerez són reconegudes internacionalment per la qualitat i singularitat dels seus vins. Espanya és també el bressol del vi de Xerès i té una llarga tradició en l'elaboració de vins escumosos com el cava. El compromís amb la innovació, la sostenibilitat i la preservació de tècniques tradicionals fa que Espanya sigui una destinació essencial per als amants del vi i l'enoturisme.",
      },
      {
        name: "Alemanya",
        description:
          "Alemanya és una regió vitivinícola amb una llarga tradició que es remunta a l'època romana. Coneguda especialment pels seus vins blancs, en particular el Riesling, el país ofereix una varietat de vins que reflecteixen la diversitat dels seus climes i terrenys. Regions com Mosel·la, Rheingau, Pfalz i Rheinhessen són reconegudes internacionalment per la qualitat i l'elegància dels seus vins. El clima fresc d'Alemanya, amb estius suaus i hiverns freds, contribueix a l'acidesa i l'aroma característics dels seus vins blancs. A més del Riesling, també es cultiven varietats com el Silvaner i el Gewürztraminer, així com raïms negres com el Spätburgunder (Pinot Noir). L'atenció al detall, el compromís amb la sostenibilitat i l'equilibri entre tradició i innovació fan d'Alemanya una destinació imprescindible per als amants del vi i l'enoturisme.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("countries", {
      name: ["Catalunya", "Francia"],
    });
  },
};
