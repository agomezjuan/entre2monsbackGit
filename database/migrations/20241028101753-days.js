"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("days", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
        comment: 'Día de la semana, ej: "Monday"',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("days");
  },
};
