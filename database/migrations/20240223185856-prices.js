"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("prices", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(10, 2), // Cambiado a DECIMAL para manejar decimales
        allowNull: false,
      },
      salePrice: {
        type: Sequelize.DECIMAL(10, 2), // Cambiado a DECIMAL para manejar decimales
        allowNull: false,
      },
      wineVintageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintage",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("prices");
  },
};
