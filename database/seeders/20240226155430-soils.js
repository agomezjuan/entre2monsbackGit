'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('soils', [{
        soil: "mood",
        description: "dfsdfdg ",
        effect: "dfm"
      }], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('soils', null, {});
  }
};
