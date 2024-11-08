"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("suppliers", [
      {
        tradeName: "Vinex S.A.",
        legalName: "Vinex International S.A.",
        nif: "ESB12345678",
        email: "info@vinex.com",
      },
      {
        tradeName: "VinaCorp",
        legalName: "VinaCorp Ltd.",
        nif: "ESB87654321",
        email: "contact@vinacorp.com",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
