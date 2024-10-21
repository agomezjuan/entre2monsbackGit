"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wine_vintages", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wines", // Asegúrate que el nombre coincida con la tabla de vinos
          key: "id",
        },
        onDelete: "CASCADE",
      },
      vintageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages", // Asegúrate que el nombre coincida con la tabla de añadas
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
    await queryInterface.dropTable("wine_vintages");
  },
};
