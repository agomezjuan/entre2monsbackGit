"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sulphites",
      [
        {
          sulphiteMin: "0.0",
          sulphiteMax: "20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sulphiteMin: "21",
          sulphiteMax: "50",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sulphiteMin: "51",
          sulphiteMax: "100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sulphites", null, {});
  },
};
