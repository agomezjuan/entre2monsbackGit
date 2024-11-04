"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("stocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: "Stock quantity",
      },
      reorder_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Reorder level",
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "Stock Keeping Unit",
      },

      wine_vintage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Ensures a 1:1 relationship
        references: {
          model: "wine_vintages", // The intermediate table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment:
          "Foreign key referencing wine_vintages for a one-to-one relation",
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("stocks");
  },
};
