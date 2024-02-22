'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price_restaurant: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      price_ecommerce: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      price_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        unique: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      wine_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'wines', 
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
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('stocks');
  }
};
