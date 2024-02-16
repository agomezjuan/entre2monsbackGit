'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Wines',  { 
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
      unique: true
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
    },
    cellar_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Cellars',
        key: 'id'
      }
    },
    soil_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Soils',
        key: 'id'
      }
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'id'
      }
    },
    region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Regions',
        key: 'id'
      }
    },
    winwType_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'WineTypes',
        key: 'id'
      }
    },
  }); 
  await queryInterface.createTable('WinesGrapes', {
    grape_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Grapes',
        key: 'id'
      }
    },
    wine_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Wines',
        key: 'id'
      }
    },
  })
  await queryInterface.createTable('WinesLogos', {
    logo_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Logos',
        key: 'id'
      }
    },
    wine_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Wines',
        key: 'id'
      }
    },
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('WinesGrapes')
    await queryInterface.dropTable('WinesLogos')  
    await queryInterface.dropTable('Wines');  
  }
}

    