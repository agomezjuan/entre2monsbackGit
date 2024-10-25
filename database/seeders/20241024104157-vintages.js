"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "vintages",
      [
        {
          vintage: 2000,
        },
        {
          vintage: 2001,
        },
        {
          vintage: 2002,
        },
        {
          vintage: 2003,
        },
        {
          vintage: 2004,
        },
        {
          vintage: 2005,
        },
        {},
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vintages", null, {});
  },
};
