"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla wines
    await queryInterface.createTable("wines", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      production: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vineyardAltitude: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      img: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tastingNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      cellarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
      },
      wineTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wineTypes",
          key: "id",
        },
      },
      sulphiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sulphites",
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

    await queryInterface.createTable("wine_labels", {
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
          model: "wines",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      labelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "labels",
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

    await queryInterface.createTable("wine_icons", {
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
          model: "wines",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      iconId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "icons",
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
    await queryInterface.dropTable("wine_labels");
    await queryInterface.dropTable("wine_icons");
    await queryInterface.dropTable("wines");
  },
};
