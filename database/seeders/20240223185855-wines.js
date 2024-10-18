"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("wines", [
      {
        name: "Cabernet Sauvignon",
        description: "Vino tinto con sabor robusto y aroma intenso.",
        production: 2020,
        vineyardAltitude: 800,
        img: "img1.jpg",
        tastingNotes: "Frutos rojos, madera, taninos suaves.",
        cellarId: 1, // Asegúrate de tener estos IDs en las tablas relacionadas
        wineTypeId: 1,
        sulphiteId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chardonnay",
        description: "Vino blanco con notas de frutas tropicales.",
        production: 2021,
        vineyardAltitude: 600,
        img: "img2.jpg",
        tastingNotes: "Piña, manzana verde, toque de roble.",
        cellarId: 1,
        wineTypeId: 2,
        sulphiteId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wines", null, {});
  },
};
