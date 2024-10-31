"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("suppliers_representatives", [
      {
        first_name: "Carlos",
        last_name: "Gómez",
        email: "carlos.gomez@proveedoruno.com",
        phone: "+34 612 345 678",
        supplier_id: 1, // ID del primer supplier generado
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Lucía",
        last_name: "Fernández",
        email: "lucia.fernandez@proveedordos.com",
        phone: "+34 634 567 890",
        supplier_id: 2, // ID del segundo supplier generado
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Javier",
        last_name: "Pérez",
        email: "javier.perez@proveedortres.com",
        phone: "+34 655 678 901",
        supplier_id: 3, // ID del tercer supplier generado
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_representatives", null, {});
  },
};
