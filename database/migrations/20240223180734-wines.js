'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla 'Wines'
    await queryInterface.createTable('wines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wine_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      vintage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cellar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cellars', // nombre de la tabla en plural
          key: 'id'
        }
      },
      soil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soils', // nombre de la tabla en plural
          key: 'id'
        }
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'countries', // nombre de la tabla en plural
          key: 'id'
        }
      },
      region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'regions', // nombre de la tabla en plural
          key: 'id'
        }
      },
      wine_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wineTypes', // nombre de la tabla en plural
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla intermedia 'WineGrapes'
    await queryInterface.createTable('WineGrapes', {
      wine_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'wines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      grape_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'grapes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla intermedia 'WineIcons' si la relación existe
    await queryInterface.createTable('WineIcons', {
      wine_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'wines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      icon_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'icons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las tablas en orden inverso de creación
    await queryInterface.dropTable('WineIcons'); // Si existe
    await queryInterface.dropTable('WineGrapes');
    await queryInterface.dropTable('wines');
  }
};
