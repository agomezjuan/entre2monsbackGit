"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cellars = await queryInterface.sequelize.query(
      `SELECT id FROM cellars;`
    );
    const suppliers = await queryInterface.sequelize.query(
      `SELECT id FROM suppliers;`
    );

    await queryInterface.bulkInsert("cellars_suppliers", [
      { cellar_id: cellars[0][0].id, supplier_id: suppliers[0][0].id },
      { cellar_id: cellars[0][1].id, supplier_id: suppliers[0][1].id },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars_suppliers", null, {});
  },
};
