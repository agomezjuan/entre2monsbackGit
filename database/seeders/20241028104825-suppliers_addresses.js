"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const suppliers = await queryInterface.sequelize.query(
      `SELECT id FROM suppliers;`
    );
    await queryInterface.bulkInsert("supplier_addresses", [
      {
        street: "Calle Mayor 1",
        city: "Madrid",
        postalCode: "28001",
        supplierId: suppliers[0][0].id,
      },
      {
        street: "Avenida Central 5",
        city: "Barcelona",
        postalCode: "08002",
        supplierId: suppliers[0][1].id,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_addresses", null, {});
  },
};
