"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar datos en la tabla 'sulphites'
    await queryInterface.bulkInsert(
      "sulphites",
      [
        {
          sulphiteMin: 10,
          sulphiteMax: 50,
        },
        {
          sulphiteMin: 20,
          sulphiteMax: 60,
        },
        {
          sulphiteMin: 30,
          sulphiteMax: 70,
        },
        {
          sulphiteMin: 40,
          sulphiteMax: 80,
        },
        {
          sulphiteMin: 50,
          sulphiteMax: 90,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los datos insertados en la tabla 'sulphites'
    await queryInterface.bulkDelete("sulphites", null, {});
  },
};
