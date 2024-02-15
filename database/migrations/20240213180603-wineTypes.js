'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('WineTypes', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    wine_type: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('WineTypes');
  }
};
