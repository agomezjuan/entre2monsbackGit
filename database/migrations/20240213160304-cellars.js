'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cellars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    cellar_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }, 
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
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
    description: Sequelize.STRING
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Cellars');
  }
};
