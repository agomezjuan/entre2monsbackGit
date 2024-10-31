"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supplier_delivery_details", [
      {
        min_purchase: 100.0,
        delivery_tax: 10.0,
        supplier_id: 1, // ID del primer supplier
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        min_purchase: 150.0,
        delivery_tax: 12.0,
        supplier_id: 2, // ID del segundo supplier
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        min_purchase: 200.0,
        delivery_tax: 15.0,
        supplier_id: 3, // ID del tercer supplier
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_delivery_details", null, {});
  },
};
