"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("prices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Precio de compra del vino",
      },
      sell_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Precio de venta del vino",
      },
      benefit_margin: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Margen de beneficio calculado en porcentaje",
      },
      wine_vintages_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages",
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
    await queryInterface.dropTable("prices");
  },
};
