'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('wines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wineName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      vintage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vineyardAlttitude: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sulphiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sulphites',
          key: 'id'
        }

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
        }
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'regions',
          key: 'id'
        }
      },
      wineTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wine_types',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.createTable('wines_grapes', {
      wineId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'wines',
          key: 'id'
        }
      },
      grapeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'grapes',
          key: 'id'
        }
      },
    })
    await queryInterface.createTable('wines_icons', {
      wineId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'wines',
          key: 'id'
        }
      },
      iconId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'icons',
          key: 'id'
        }
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wines_grapes')
    await queryInterface.dropTable('wines_icons')
    await queryInterface.dropTable('wines');
  }
};
