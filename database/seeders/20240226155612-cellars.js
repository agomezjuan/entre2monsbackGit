'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cellars', [{
        cellar: "Viñas del Vero",
        description: "Las mejores!!!",
        distance: "400 km",
        regionId: 1,
        soilId: 1
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('cellars', null, {});
  
  }
};
