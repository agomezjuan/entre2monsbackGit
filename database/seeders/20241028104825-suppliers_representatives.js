"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const suppliers = await queryInterface.sequelize.query(
      `SELECT id FROM suppliers;`
    );
    await queryInterface.bulkInsert("suppliers_representatives", [
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@vinex.com",
        supplierId: suppliers[0][0].id,
      },
      {
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@vinacorp.com",
        supplierId: suppliers[0][1].id,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("suppliers_representatives", null, {});
  },
};
