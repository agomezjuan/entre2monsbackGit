"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wine_vintage_grape", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      grapeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "grapes",
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
    await queryInterface.dropTable("wine_vintage_grape");
  },
};
