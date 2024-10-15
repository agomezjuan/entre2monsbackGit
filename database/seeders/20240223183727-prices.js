"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertamos algunos precios en la tabla 'prices'
    await queryInterface.bulkInsert(
      "prices",
      [
        {
          costPrice: 15.99,
          sellPrice: 29.99,
          date: new Date(), // Fecha actual
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          costPrice: 20.49,
          sellPrice: 34.99,
          date: new Date(), // Fecha actual
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          costPrice: 9.99,
          sellPrice: 19.99,
          date: new Date(), // Fecha actual
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          costPrice: 30.0,
          sellPrice: 55.0,
          date: new Date(), // Fecha actual
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          costPrice: 5.5,
          sellPrice: 10.99,
          date: new Date(), // Fecha actual
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar todos los datos de la tabla 'prices'
    await queryInterface.bulkDelete("prices", null, {});
  },
};
