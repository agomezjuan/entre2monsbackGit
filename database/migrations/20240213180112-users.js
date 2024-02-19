'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING, // Usa Sequelize en lugar de DataTypes
        allowNull: false,
      },
      user_surnames: { // usa snake_case para el nombre de la columna
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: { // snake_case para el nombre de la columna
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: { // snake_case para el nombre de la columna
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
