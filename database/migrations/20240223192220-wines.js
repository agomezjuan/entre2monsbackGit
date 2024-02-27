'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wines', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true
      },
      wine: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      production: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vineyardAltitude: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      img: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cellarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cellars',
          key: 'id'
        }
      },
      stockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stocks',
          key: 'id'
        }
      },
      wineTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wineTypes',
          key: 'id'
        }
      },
      sulphiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sulphites',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {  
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    /*
      * Create table wines_grapes
    */

    await queryInterface.createTable('wines_grapes', {
      wineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wines',
          key: 'id'
        }
      },
      grapeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'grapes',
          key: 'id'
        } 
      },
    })

    /*
      * Create table wines_icons
    */  

    await queryInterface.createTable('wines_icons', {
      wineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wines',
          key: 'id'
        }
      },
      iconId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'icons',
          key: 'id'
        } 
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('wines_grapes');
    await queryInterface.dropTable('wines_icons');
    await queryInterface.dropTable('wines');
  }
};
