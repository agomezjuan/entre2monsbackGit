"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cellars", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cellar: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      distance: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "regions",
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

    /*
     * Middle table cellar_soils
     */

    await queryInterface.createTable("cellar_soils", {
      cellarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
      },
      soilId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "soils",
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
     * * Middle table cellar_suppliers
     */
    await queryInterface.createTable("cellar_suppliers", {
      cellarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "suppliers",
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
    await queryInterface.dropTable("cellar_soils");
    await queryInterface.dropTable("cellar_suppliers");
    await queryInterface.dropTable("cellars");
  },
};
