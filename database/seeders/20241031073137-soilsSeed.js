"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "soils",
      [
        {
          name: "Calizo",
          description:
            "Suelo rico en calcio y bien drenado, ideal para uvas de alta calidad.",
          effect:
            "Aporta mineralidad y acidez a los vinos, especialmente adecuado para vinos blancos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Arcilloso",
          description:
            "Suelo con alto contenido de arcilla que retiene bien el agua.",
          effect:
            "Proporciona cuerpo y estructura a los vinos, favoreciendo la producción de tintos robustos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Granítico",
          description:
            "Suelo de origen volcánico con buena capacidad de drenaje.",
          effect:
            "Ofrece una acidez vibrante y frescura, ideal para vinos con carácter afrutado.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Arenoso",
          description: "Suelo ligero con buen drenaje, pobre en nutrientes.",
          effect:
            "Permite vinos ligeros y elegantes, con baja cantidad de taninos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Limoso",
          description: "Suelo con alto contenido en limo, rico en nutrientes.",
          effect:
            "Favorece el crecimiento de cepas vigorosas, contribuyendo a la producción de vinos complejos y aromáticos.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("soils", null, {});
  },
};
