'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('icons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, 
      },
      icon: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      created_at: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' ),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('icons');
  }
};