"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dos = await queryInterface.sequelize.query(`SELECT id FROM dos;`);

    await queryInterface.bulkInsert("cellars", [
      {
        name: "Chateau Margaux",
        doId: dos[0][0].id,
        description: "Historical wine producer in Bordeaux.",
      },
      {
        name: "Antinori",
        doId: dos[0][1].id,
        description: "Leading wine producer in Tuscany.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars", null, {});
  },
};
