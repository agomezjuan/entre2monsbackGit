"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cellars_suppliers",
      [
        {
          cellar_id: 1, // ID de la bodega "Bodega Tradicional"
          supplier_id: 1, // ID del proveedor asociado
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 1,
          supplier_id: 2, // Otro proveedor para la misma bodega
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 2, // ID de la bodega "Bodega Moderna"
          supplier_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 2,
          supplier_id: 3, // Otro proveedor para la misma bodega
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 3, // ID de la bodega "Bodega de Montaña"
          supplier_id: 1, // Proveedor asociado
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cellar_id: 3,
          supplier_id: 3, // Otro proveedor para la misma bodega
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cellars_suppliers", null, {});
  },
};
