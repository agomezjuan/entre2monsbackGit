"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stocks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "ID de referencia al stock vendido",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        comment: "Cantidad de unidades vendidas en esta transacción",
      },
      purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de compra por unidad del producto",
      },
      sale_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de venta por unidad del producto",
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
    await queryInterface.dropTable("sales");
  },
};
