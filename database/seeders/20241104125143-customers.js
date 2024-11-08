"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("customers", [
      {
        name: "John",
        surnames: "Doe",
        email: "john.doe@example.com",
        phone: "+123456789",
        notes: "Prefers red wines.",
      },
      {
        name: "Jane",
        surnames: "Smith",
        email: "jane.smith@example.com",
        phone: "+987654321",
        notes: "Interested in white wines.",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
