"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cellars",
      [
        {
          cellar: "Domaine de la Romanée-Conti",
          description:
            "Un dels cellers més prestigiosos del món, situat a la Borgonya, especialitzat en la producció de vins negres de Pinot Noir de vinyes de grand cru.",
          distance: "824 km",
          regionId: 1,
        },
        {
          cellar: "Domaine Leflaive",
          description:
            "Un celler icònic de la Borgonya, conegut pels seus vins blancs elegants i amb gran capacitat de guarda, elaborats amb Chardonnay.",
          distance: "828 km",
          regionId: 1,
        },
        {
          cellar: "Château Margaux",
          description:
            "Celler de renom mundial a la regió de Bordeus, conegut pels seus vins negres de gran complexitat i capacitat d'envelliment.",
          distance: "695 km",
          regionId: 2,
        },
        {
          cellar: "Château Pétrus",
          description:
            "Un celler mític a la regió de Bordeus, conegut pels seus vins exclusius i de preu elevat, elaborats principalment amb raïm Merlot.",
          distance: "704 km",
          regionId: 2,
        },
        {
          cellar: "Moët & Chandon",
          description:
            "Un dels cellers més famosos de la regió de Champagne, conegut pels seus elegants vins escumosos elaborats amb el mètode tradicional.",
          distance: "1.050 km",
          regionId: 3,
        },
        {
          cellar: "Veuve Clicquot",
          description:
            "Celler reconegut mundialment per la seva producció de Champagne d'alta gamma, amb una llarga història que es remunta al segle XVIII.",
          distance: "1.046 km",
          regionId: 3,
        },
        {
          cellar: "Bodegas Vega Sicilia",
          description:
            "Un dels cellers més icònics d'Espanya, situat a la Ribera del Duero, conegut pels seus vins negres d'alta gamma, especialment el 'Unico'.",
          distance: "759 km",
          regionId: 1,
        },
        {
          cellar: "Bodegas Protos",
          description:
            "Fundat l'any 1927, aquest celler de la Ribera del Duero és reconegut pels seus vins negres de Tempranillo amb un caràcter fort i elegant.",
          distance: "756 km",
          regionId: 1,
        },
        {
          cellar: "Bodegas Marqués de Riscal",
          description:
            "Celler històric a La Rioja, famós pels seus vins clàssics de Rioja i per la seva innovadora arquitectura moderna.",
          distance: "622 km",
          regionId: 2,
        },
        {
          cellar: "Bodegas López de Heredia",
          description:
            "Una de les bodegues més antigues de La Rioja, coneguda pels seus vins tradicionals i de llarga guarda elaborats amb raïm Tempranillo.",
          distance: "625 km",
          regionId: 2,
        },
        {
          cellar: "Weingut Egon Müller",
          description:
            "Un dels cellers més famosos de la regió de Mosel, reconegut per la seva producció de Riesling d'alta qualitat amb una gran capacitat d'envelliment.",
          distance: "1.280 km",
          regionId: 1,
        },
        {
          cellar: "Weingut Dr. Loosen",
          description:
            "Celler familiar de la regió de Mosel, conegut pels seus Riesling aromàtics i frescos, amb una acidesa vibrant.",
          distance: "1.275 km",
          regionId: 1,
        },
        {
          cellar: "Schloss Johannisberg",
          description:
            "Un celler històric a la regió de Rheingau, reconegut com un dels més antics en la producció de vins de Riesling.",
          distance: "1.237 km",
          regionId: 2,
        },
        {
          cellar: "Weingut Robert Weil",
          description:
            "Un celler de renom a Rheingau, conegut pels seus vins elegants de Riesling amb un gran potencial de guarda.",
          distance: "1.230 km",
          regionId: 2,
        },

        {
          cellar: "Clos Mogador",
          description:
            "Celler de renom al Priorat, conegut pels seus vins profunds i complexos elaborats amb Garnatxa i Carinyena, amb una marcada mineralitat.",
          distance: "172 km",
          regionId: 3,
        },
        {
          cellar: "Alvaro Palacios",
          description:
            "Un dels cellers més prestigiosos del Priorat, conegut per la seva producció de vins de gran intensitat i elegància, especialment 'L'Ermita'.",
          distance: "174 km",
          regionId: 3,
        },
        {
          cellar: "Codorníu",
          description:
            "Un dels cellers més antics d'Espanya, reconegut mundialment per la seva producció de Cava d'alta qualitat.",
          distance: "119 km",
          regionId: 4,
        },
        {
          cellar: "Freixenet",
          description:
            "Un dels majors productors de Cava del món, situat al Penedès, conegut per la seva tradició i innovació en vins escumosos.",
          distance: "121 km",
          regionId: 4,
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cellars", null, {});
  },
};
