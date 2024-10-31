"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supplier_addresses", [
      {
        street: "Calle de la Industria, 10",
        city: "Madrid",
        postal_code: "28001",
        supplier_id: 1, // ID del primer supplier generado
        region_id: 1, // Asegúrate de que este ID exista en la tabla regions
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        street: "Avenida de la Innovación, 25",
        city: "Barcelona",
        postal_code: "08019",
        supplier_id: 2, // ID del segundo supplier generado
        region_id: 2, // Asegúrate de que este ID exista en la tabla regions
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        street: "Plaza del Comercio, 5",
        city: "Valencia",
        postal_code: "46001",
        supplier_id: 3, // ID del tercer supplier generado
        region_id: 3, // Asegúrate de que este ID exista en la tabla regions
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_addresses", null, {});
  },
};
