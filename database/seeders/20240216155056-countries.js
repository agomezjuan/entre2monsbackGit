'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('countries', [{
      country: "France" ,
      description: "The best wines in the world"
    }], {});
  },

  async down (queryInterface, Sequelize) {+
    await queryInterface.bulkDelete('countries', null, {});

  }
};
