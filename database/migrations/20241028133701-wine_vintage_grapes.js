"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("wine_vintage_grapes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      wine_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vintage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      grape_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "grapes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("wine_vintage_grapes");
  },
};
