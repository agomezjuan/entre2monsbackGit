"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Elimina posibles duplicados antes de insertar
    await queryInterface.bulkDelete("dos", {});

    // Insertar denominaciones de origen (DOs) en `dos`
    const dos = await queryInterface.bulkInsert(
      "dos",
      [
        {
          name: "D.O. Empordà",
          description: `La Denominació d'Origen Empordà és una regió vitivinícola situada a l'extrem nord-est de Catalunya, a la província de Girona, que abasta les comarques de l'Alt Empordà i el Baix Empordà. Amb una tradició que es remunta a l'època grega i romana, la DO Empordà és coneguda per la qualitat i diversitat dels seus vins.

          El clima mediterrani, influenciat per la Tramuntana—un vent del nord que aporta frescor i protegeix les vinyes de malalties—proporciona condicions òptimes per al cultiu de la vinya. Els sòls són variats, des de terrenys granítics i pissarrosos fins a calcàris i arenosos, cosa que contribueix a la singularitat i complexitat dels vins de la regió.

          A la DO Empordà es cultiven varietats autòctones com la Garnatxa (Garnatxa) i la Carinyena (Carinyena), que són la base de molts dels seus vins negres i dolços. També s'utilitzen varietats internacionals com el Cabernet Sauvignon, el Merlot, el Syrah i el Tempranillo, permetent l'elaboració de vins amb perfils variats i equilibrats. Pel que fa als vins blancs, destaquen les varietats Macabeu, Moscatell d'Alexandria i Chardonnay.

          La regió és famosa per la seva "Garnatxa de l'Empordà", un vi dolç natural elaborat amb raïms sobremadurs de Garnatxa, que ofereix sabors intensos i aromàtics. A més, els vins rosats de la DO Empordà són reconeguts per la seva frescor i vivacitat.

          El compromís dels viticultors amb la innovació, la sostenibilitat i la preservació de les tècniques tradicionals reflecteix l'essència de la DO Empordà. La regió és també una destinació destacada per a l'enoturisme, oferint experiències úniques en cellers i vinyes, envoltats de paisatges mediterranis i un ric patrimoni cultural i gastronòmic. La passió per la viticultura i el respecte pel medi ambient fan de la DO Empordà una referència imprescindible en el panorama vitivinícola català.`,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Pla de Bages",
          description: "Denominación de Origen en Barcelona, Catalunya.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Penedès",
          description: "Denominación de Origen en Penedès, Catalunya.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Cava",
          description: "Denominación de Origen en Penedès, famosa por el Cava.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Médoc",
          description: "Denominación de Origen en Bordeaux, Francia.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Saint-Émilion",
          description:
            "Denominación de Origen en Bordeaux, famosa por sus vinos tintos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Champagne",
          description:
            "Denominación de Origen en Champagne, famosa por el espumoso.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "DO Aube",
          description: "Otra Denominación de Origen en Champagne, Francia.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: ["id"] }
    );

    // Continuar con la creación de las relaciones en `regions_dos` según sea necesario
    // ...
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions_dos", null, {});
    await queryInterface.bulkDelete("dos", null, {});
  },
};
