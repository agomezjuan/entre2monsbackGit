"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("wines", [
      {
        name: "Chardonnay Reserva",
        description: "Un vino blanco seco con notas de manzana y vainilla.",
        production: 5000,
        vineyardAltitude: 400,
        img: "https://example.com/images/chardonnay_reserva.png",
        tastingNotes: "Manzana verde, vainilla, y un toque de miel.",
        cellarId: 1, // Debes asegurarte de que esta bodega exista en tu tabla cellars
        sulphiteId: 3, // Debes asegurarte de que este sulphite exista en tu tabla sulphites
        wineTypeId: 2, // Debes asegurarte de que este tipo de vino exista en tu tabla wineTypes
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cabernet Sauvignon",
        description:
          "Un vino tinto robusto con notas de cereza negra y tabaco.",
        production: 3000,
        vineyardAltitude: 500,
        img: "https://example.com/images/cabernet_sauvignon.png",
        tastingNotes: "Cereza negra, tabaco, y un toque de roble.",
        cellarId: 2, // Referencia a otra bodega existente
        sulphiteId: 2, // Referencia a sulphites existente
        wineTypeId: 1, // Referencia a un tipo de vino existente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Merlot",
        description:
          "Un vino tinto suave y afrutado con notas de ciruela y cacao.",
        production: 4500,
        vineyardAltitude: 350,
        img: "https://example.com/images/merlot.png",
        tastingNotes: "Ciruela, cacao y un toque de vainilla.",
        cellarId: 3, // Referencia a otra bodega existente
        sulphiteId: 1, // Referencia a sulphites existente
        wineTypeId: 1, // Referencia a un tipo de vino existente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Malbec",
        description: "Un vino tinto intenso con notas de mora y regaliz.",
        production: 4000,
        vineyardAltitude: 600,
        img: "https://example.com/images/malbec.png",
        tastingNotes: "Mora, regaliz y un toque de pimienta.",
        cellarId: 4, // Referencia a otra bodega existente
        sulphiteId: 2, // Referencia a sulphites existente
        wineTypeId: 1, // Referencia a un tipo de vino existente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("wines", null, {});
  },
};
