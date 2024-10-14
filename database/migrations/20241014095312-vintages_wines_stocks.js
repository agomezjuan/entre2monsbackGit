"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vintages_wines_stocks", {
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
          model: "wines", // Asegúrate de que este sea el nombre correcto de la tabla 'wines'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vintageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages", // Asegúrate de que este sea el nombre correcto de la tabla 'vintages'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      stockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stocks", // Asegúrate de que este sea el nombre correcto de la tabla 'stocks'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      priceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "prices", // Asegúrate de que este sea el nombre correcto de la tabla 'prices'
          key: "id",
        },
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("vintages_wines_stocks");
  },
};
