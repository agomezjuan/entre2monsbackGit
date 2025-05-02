"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("wines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre del vino",
      },
      vineyard_altitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Altitud del viñedo en metros",
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "URL o ruta de la imagen del vino",
      },
      production: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Producción total en unidades",
      },
      tasting_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Notas de cata del vino",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Descripción adicional del vino",
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      cellar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación con la bodega (Cellar) a la que pertenece el vino",
      },
      wine_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wine_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación con el tipo de vino",
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
    await queryInterface.dropTable;
  },
};
