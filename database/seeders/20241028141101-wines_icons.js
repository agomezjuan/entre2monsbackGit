"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wines = await queryInterface.sequelize.query(`SELECT id FROM wines;`);
    const icons = await queryInterface.sequelize.query(`SELECT id FROM icons;`);

    await queryInterface.bulkInsert("wines_icons", [
      { wine_id: wines[0][0].id, icon_id: icons[0][0].id },
      { wine_id: wines[0][1].id, icon_id: icons[0][1].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wines_icons", null, {});
  },
};
