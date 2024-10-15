"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar datos en la tabla 'orders'
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          orderDate: new Date("2024-01-15"),
          customerId: 1, // ID del cliente que realizó el pedido
        },
        {
          orderDate: new Date("2024-01-16"),
          customerId: 2,
        },
        {
          orderDate: new Date("2024-01-17"),
          customerId: 3,
        },
      ],
      {}
    );

    // Insertar datos en la tabla intermedia 'order_wines'
    await queryInterface.bulkInsert(
      "order_wines",
      [
        {
          orderId: 1, // ID del pedido
          wineId: 1, // ID del vino relacionado
        },
        {
          orderId: 1,
          wineId: 2,
        },
        {
          orderId: 2,
          wineId: 3,
        },
        {
          orderId: 2,
          wineId: 1,
        },
        {
          orderId: 3,
          wineId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los datos de las tablas 'order_wines' y 'orders'
    await queryInterface.bulkDelete("order_wines", null, {});
    await queryInterface.bulkDelete("orders", null, {});
  },
};
