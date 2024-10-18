"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar datos de ejemplo en la tabla 'vintages'
    await queryInterface.bulkInsert(
      "vintages",
      [
        { vintage: 2018, createdAt: new Date(), updatedAt: new Date() },
        { vintage: 2019, createdAt: new Date(), updatedAt: new Date() },
        { vintage: 2020, createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los datos insertados en la tabla 'vintages'
    await queryInterface.bulkDelete("vintages", null, {});
  },
};
