"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertamos algunos registros de stock en la tabla 'stocks'
    await queryInterface.bulkInsert(
      "stocks",
      [
        {
          sku: "VIN-001", // Identificador único del stock
          amountIn: 100, // Cantidad de botellas recibidas
          amountOut: 20, // Cantidad de botellas vendidas o utilizadas
          priceId: 1, // Relación con el precio asociado (priceId de la tabla 'prices')
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "VIN-002",
          amountIn: 50,
          amountOut: 10,
          priceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "VIN-003",
          amountIn: 200,
          amountOut: 60,
          priceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "VIN-004",
          amountIn: 120,
          amountOut: 30,
          priceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "VIN-005",
          amountIn: 80,
          amountOut: 25,
          priceId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar todos los datos de la tabla 'stocks'
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
