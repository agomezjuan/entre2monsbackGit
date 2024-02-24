'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cellars', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cellar: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      distance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'regions',
          key: 'id'
        }
      },
      soilId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soils',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
    
    /*
      * Middle table cellar_soils
    */

    await queryInterface.createTable('cellar_soils', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cellarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cellars',
          key: 'id'
        }
      },
      soilId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soils',
          key: 'id'
        },
      },
    });  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cellar_soils');
    await queryInterface.dropTable('cellars');
  }
};
