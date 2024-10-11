"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("icons", [
      {
        url: "https://example.com/icon1.png",
        description: "Icon representing a wine bottle.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "https://example.com/icon2.png",
        description: "Icon representing a grapevine.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "https://example.com/icon3.png",
        description: "Icon representing a wine glass.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "https://example.com/icon4.png",
        description: "Icon representing a vineyard landscape.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "https://example.com/icon5.png",
        description: "Icon representing a wine barrel.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("icons", null, {});
  },
};
