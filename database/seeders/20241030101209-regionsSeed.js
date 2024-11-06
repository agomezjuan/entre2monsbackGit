"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener los IDs de Catalunya y Francia desde la tabla countries
    const countries = await queryInterface.sequelize.query(
      `SELECT id, name FROM countries WHERE name IN ('Catalunya', 'Francia');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const catalunya = countries.find((country) => country.name === "Catalunya");
    const francia = countries.find((country) => country.name === "Francia");

    if (!catalunya || !francia) {
      throw new Error(
        "Catalunya y Francia deben estar presentes en la tabla countries antes de ejecutar esta seed."
      );
    }

    await queryInterface.bulkInsert("regions", [
      {
        name: "Baix Empordà",
        description:
          "El Baix Empordà és una regió situada a la província de Girona, a Catalunya, reconeguda per la seva rica tradició vitivinícola. Amb un clima mediterrani influenciat per la Tramuntana, un vent del nord que aporta frescor i caràcter, la zona ofereix condicions ideals per al cultiu de la vinya. Els sòls són diversos, des de terrenys granítics fins a calcàris, cosa que contribueix a la singularitat i complexitat dels vins produïts.Sota la Denominació d'Origen Empordà, els cellers del Baix Empordà elaboren vins negres, blancs i rosats de gran qualitat. Es cultiven varietats autòctones com la Garnatxa i la Carinyena, així com ceps internacionals com el Cabernet Sauvignon i el Merlot. La combinació de tècniques tradicionals i modernes en viticultura i enologia reflecteix el compromís de la regió amb l'excel·lència i la innovació. El Baix Empordà és també una destinació destacada per a l'enoturisme, oferint experiències úniques als seus vinyes i cellers, envoltats de paisatges mediterranis i patrimoni cultural. La passió per la viticultura i el respecte pel medi ambient fan d'aquesta regió un lloc imprescindible per als amants del vi.",
        country_id: catalunya.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Baix Empordà",
        description:
          "L'Alt Empordà és una comarca situada al nord-est de Catalunya, a la província de Girona, coneguda per la seva llarga tradició vitivinícola. Amb un clima mediterrani influenciat per la Tramuntana, un vent fort i sec que aporta frescor i caràcter a les vinyes, la zona ofereix condicions excel·lents per al cultiu de la vinya. Els sòls de l'Alt Empordà són diversos, incloent-hi terrenys granítics, pissarrosos i calcàris, que contribueixen a la complexitat i singularitat dels vins de la regió.Sota la Denominació d'Origen Empordà, els cellers de l'Alt Empordà elaboren vins negres, blancs i rosats de gran qualitat. Es cultiven varietats autòctones com la Garnatxa i la Carinyena, així com varietats internacionals com el Cabernet Sauvignon, el Merlot i el Syrah. La combinació de tècniques tradicionals i innovadores en viticultura i enologia reflecteix el compromís de la comarca amb l'excel·lència i la sostenibilitat. L'Alt Empordà és també una destinació destacada per a l'enoturisme, oferint experiències úniques als seus cellers i vinyes, envoltats de paisatges espectaculars que combinen el mar Mediterrani i la serralada dels Pirineus. La riquesa cultural i històrica de la zona, amb pobles medievals i vestigis megalítics, complementa l'atractiu enoturístic. La passió per la viticultura i el respecte pel medi ambient fan de l'Alt Empordà una destinació imprescindible per als amants del vi.",
        country_id: catalunya.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bordeaux",
        description:
          "Famosa región de vinos en Francia, conocida por sus tintos.",
        country_id: francia.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Champagne",
        description: "Región de Francia famosa por el vino espumoso.",
        country_id: francia.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
