"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("supplier_delivery_days", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supplier_delivery_detail_id: {
        // Asegúrate de que coincide con la tabla referenciada
        type: Sequelize.INTEGER,
        references: {
          model: "supplier_delivery_details", // Verifica el nombre exacto de la tabla
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      day_id: {
        // Asegúrate de que coincide con la tabla referenciada
        type: Sequelize.INTEGER,
        references: {
          model: "days", // Verifica el nombre exacto de la tabla
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("supplier_delivery_days");
  },
};
