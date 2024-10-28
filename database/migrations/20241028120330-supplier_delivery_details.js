"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("supplier_delivery_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      min_purchase: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
        comment: "Pedido mínimo requerido para evitar cargos de entrega",
      },
      delivery_tax: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
        comment:
          "Costo de entrega si no se cumple con el pedido mínimo, 0 si no aplica",
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "suppliers",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación uno a uno con Supplier",
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
    await queryInterface.dropTable("supplier_delivery_details");
  },
};
