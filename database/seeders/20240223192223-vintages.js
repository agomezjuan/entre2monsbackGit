"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar datos de ejemplo en la tabla 'vintages'
    await queryInterface.bulkInsert(
      "vintages",
      [
        {
          vintage: 2015, // Añada del vino
        },
        {
          vintage: 2016,
        },
        {
          vintage: 2017,
        },
        {
          vintage: 2018,
        },
        {
          vintage: 2019,
        },
        {
          vintage: 2020,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los datos insertados en la tabla 'vintages'
    await queryInterface.bulkDelete("vintages", null, {});
  },
};
