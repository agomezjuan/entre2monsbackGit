"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "icons",
      [
        {
          url: "Vinyes Velles",
          description: "Vinyes Velles",
        },
        {
          url: "Vinyes Prefiloxèriques",
          description: "Vinyes Prefiloxèriques",
        },
        {
          url: "Barrica de fusta",
          description: "Barrica de fusta",
        },
        {
          url: "Ánfora de fang",
          description: "Ánfora de fang",
        },
        {
          url: "Acer inox",
          description: "Acer inox",
        },
        {
          url: "Ecologic",
          description: "Ecologic",
        },
        {
          url: "Biodinàmic",
          description: "Biodinàmic",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("icons", null, {});
  },
};
