"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("wine_vintages", {
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
        onDelete: "CASCADE", // Elimina el registro en wine_vintages si se elimina el wine
        comment: "Relación con el modelo Wine",
      },
      vintage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION", // No hace nada si se elimina el vintage
        comment: "Relación con el modelo Vintage",
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
    await queryInterface.dropTable("wine_vintages");
  },
};
