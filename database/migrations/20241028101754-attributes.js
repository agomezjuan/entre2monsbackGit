"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attributes", {
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
        comment: "Nombre del atributo",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "Descripción del atributo",
      },
      attribute_category_id: {
        // Cambiado a "attribute_category_id" en lugar de "AttributeCategoryId"
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "attribute_categories", // Cambiado a "attribute_categories"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación con la tabla attribute_categories",
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
    await queryInterface.dropTable("attributes");
  },
};
