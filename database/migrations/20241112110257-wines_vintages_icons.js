"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wines_vintages_icons", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      wine_vintage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages", // Asegúrate que coincide con la tabla
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      icon_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "icons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wines_vintages_icons");
  },
};
