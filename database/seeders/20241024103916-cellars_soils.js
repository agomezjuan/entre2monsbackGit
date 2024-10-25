"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cellars_soils",
      [
        {
          soilId: 1, // Pedregoso
          cellarId: 1, // Domaine de la Romanée-Conti
        },
        {
          soilId: 2, // Calcari
          cellarId: 1, // Domaine de la Romanée-Conti
        },
        {
          soilId: 3, // Argilós
          cellarId: 1, // Domaine de la Romanée-Conti
        },
        {
          soilId: 2, // Calcari
          cellarId: 2, // Domaine Leflaive
        },
        {
          soilId: 6, // Argilo-calcari
          cellarId: 2, // Domaine Leflaive
        },
        {
          soilId: 3, // Argilós
          cellarId: 3, // Château Margaux
        },
        {
          soilId: 4, // Gravós
          cellarId: 3, // Château Margaux
        },
        {
          soilId: 4, // Gravós
          cellarId: 4, // Château Pétrus
        },
        {
          soilId: 5, // Pissarra
          cellarId: 5, // Moët & Chandon
        },
        {
          soilId: 6, // Argilo-calcari
          cellarId: 6, // Veuve Clicquot
        },
        {
          soilId: 7, // Sorrenós
          cellarId: 7, // Bodegas Marqués de Riscal
        },
        {
          soilId: 8, // Llicorella
          cellarId: 7, // Bodegas Marqués de Riscal
        },
        {
          soilId: 8, // Llicorella
          cellarId: 8, // Bodegas López de Heredia
        },
        {
          soilId: 9, // Volcànic
          cellarId: 9, // Bodegas Vega Sicilia
        },
        {
          soilId: 10, // Basalt
          cellarId: 9, // Bodegas Vega Sicilia
        },
        {
          soilId: 9, // Volcànic
          cellarId: 10, // Bodegas Protos
        },
        {
          soilId: 5, // Pissarra
          cellarId: 11, // Weingut Egon Müller
        },
        {
          soilId: 12, // Loess
          cellarId: 11, // Weingut Egon Müller
        },
        {
          soilId: 12, // Loess
          cellarId: 12, // Weingut Dr. Loosen
        },
        {
          soilId: 5, // Pissarra
          cellarId: 12, // Weingut Dr. Loosen
        },
        {
          soilId: 6, // Argilo-calcari
          cellarId: 13, // Schloss Johannisberg
        },
        {
          soilId: 12, // Loess
          cellarId: 13, // Schloss Johannisberg
        },
        {
          soilId: 6, // Argilo-calcari
          cellarId: 14, // Weingut Robert Weil
        },
        {
          soilId: 5, // Pissarra
          cellarId: 14, // Weingut Robert Weil
        },
        {
          soilId: 8, // Llicorella
          cellarId: 15, // Clos Mogador
        },
        {
          soilId: 8, // Llicorella
          cellarId: 16, // Alvaro Palacios
        },
        {
          soilId: 2, // Calcari
          cellarId: 17, // Codorníu
        },
        {
          soilId: 5, // Pissarra
          cellarId: 17, // Codorníu
        },
        {
          soilId: 2, // Calcari
          cellarId: 18, // Freixenet
        },
        {
          soilId: 3, // Argilós
          cellarId: 18, // Freixenet
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cellars_soils", null, {});
  },
};
