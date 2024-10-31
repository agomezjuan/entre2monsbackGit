"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "vintages",
      [
        {
          year: 2015,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: 2016,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: 2017,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: 2018,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: 2019,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: 2020,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("vintages", null, {});
  },
};
