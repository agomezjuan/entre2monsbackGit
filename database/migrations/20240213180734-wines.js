'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
    cellar_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'cellars',
        key: 'id'
      }
    }
  }); 
  },

  async down (queryInterface, Sequelize) {  
    await queryInterface.dropTable('wines');
  
  }
};
