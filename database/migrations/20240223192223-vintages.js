"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vintages", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vintage: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

    /**
     ** Table vintages_wines
     * @param vintageId - integer - not null - references vintages.id
     * @param wineId - integer - not null - references wines.id
     */

    await queryInterface.createTable("vintages_wines", {
      vintageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
      },
      wineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
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

    /**
     **Table vintage_grapes
     * @param vintageId - integer - not null - references vintages.id
     * @param grapeId - integer - not null - references grapes.id
     */
    await queryInterface.createTable("vintages_grapes", {
      vintageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
      },
      grapeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "grapes",
          key: "id",
        },
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
    await queryInterface.dropTable("vintages_grapes");
    await queryInterface.dropTable("vintages");
  },
};
