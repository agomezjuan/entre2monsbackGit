'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, // Cambiado de DataTypes.INTEGER a Sequelize.INTEGER
      },
      logo: {
        type: Sequelize.STRING, // Cambiado de DataTypes.STRING a Sequelize.STRING
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING, // Cambiado de DataTypes.STRING a Sequelize.STRING
      },
      createdAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' ),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logos');
  }
};