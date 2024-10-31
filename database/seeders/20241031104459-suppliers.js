"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("suppliers", [
      {
        trade_name: "Proveedor Uno",
        legal_name: "Proveedor Uno S.A.",
        nif: "ESB12345678",
        email: "contacto@proveedoruno.com",
        phone: "+34 612 345 678",
        web: "https://www.proveedoruno.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        trade_name: "Proveedor Dos",
        legal_name: "Proveedor Dos S.L.",
        nif: "ESB23456789",
        email: "info@proveedordos.com",
        phone: "+34 634 567 890",
        web: "https://www.proveedordos.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        trade_name: "Proveedor Tres",
        legal_name: "Proveedor Tres C.A.",
        nif: "ESB34567890",
        email: "soporte@proveedortres.com",
        phone: "+34 655 678 901",
        web: "https://www.proveedortres.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
