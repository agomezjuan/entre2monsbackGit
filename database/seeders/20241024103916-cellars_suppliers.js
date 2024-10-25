"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cellars_suppliers",
      [
        { cellarId: 1, supplierId: 1 },
        { cellarId: 1, supplierId: 2 },
        { cellarId: 2, supplierId: 1 },
        { cellarId: 2, supplierId: 3 },
        { cellarId: 3, supplierId: 2 },
        { cellarId: 3, supplierId: 3 },
        { cellarId: 4, supplierId: 1 },
        { cellarId: 5, supplierId: 2 },
        { cellarId: 5, supplierId: 3 },
        { cellarId: 6, supplierId: 1 },
        { cellarId: 7, supplierId: 2 },
        { cellarId: 7, supplierId: 3 },
        { cellarId: 8, supplierId: 1 },
        { cellarId: 9, supplierId: 2 },
        { cellarId: 10, supplierId: 3 },
        { cellarId: 11, supplierId: 1 },
        { cellarId: 12, supplierId: 2 },
        { cellarId: 13, supplierId: 3 },
        { cellarId: 14, supplierId: 1 },
        { cellarId: 15, supplierId: 2 },
        { cellarId: 16, supplierId: 3 },
        { cellarId: 17, supplierId: 1 },
        { cellarId: 18, supplierId: 2 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cellars_suppliers", null, {});
  },
};
