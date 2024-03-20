'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('infoCreateWines', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      helpText: {
        type: Sequelize.TEXT, 
        allowNull: false,
 
      },
    });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('infoCreateWines');
  }
};