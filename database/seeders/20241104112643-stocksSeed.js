"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stocks", [
      {
        sku: "0001-MERL",
        quantity: 150,
        reorder_level: 50,
        wine_vintage_id: 1, // Asegúrate de que esta referencia exista en `wine_vintages`
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sku: "0002-CHAN",
        quantity: 200,
        reorder_level: 60,
        wine_vintage_id: 2, // Asegúrate de que esta referencia exista en `wine_vintages`
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sku: "0003-CABE",
        quantity: 100,
        reorder_level: 30,
        wine_vintage_id: 3, // Asegúrate de que esta referencia exista en `wine_vintages`
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Agrega más registros según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
