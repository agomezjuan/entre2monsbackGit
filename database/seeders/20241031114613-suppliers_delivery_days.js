"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ajusta los IDs según lo que exista en supplier_delivery_details y days
    await queryInterface.bulkInsert("supplier_delivery_days", [
      { supplier_delivery_detail_id: 1, day_id: 1 }, // Ejemplo para Lunes
      { supplier_delivery_detail_id: 1, day_id: 3 }, // Ejemplo para Miércoles
      { supplier_delivery_detail_id: 2, day_id: 2 }, // Ejemplo para Martes
      { supplier_delivery_detail_id: 2, day_id: 4 }, // Ejemplo para Jueves
      { supplier_delivery_detail_id: 3, day_id: 5 }, // Ejemplo para Viernes
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_delivery_days", null, {});
  },
};
