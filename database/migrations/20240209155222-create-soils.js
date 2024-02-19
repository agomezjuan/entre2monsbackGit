'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      soil_type: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('soils');
  }
};