'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('regions', [{
      region: 'Boredeux',
      description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      countryId: 1
    }], {});    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regions', null, {});
    
  }
};
