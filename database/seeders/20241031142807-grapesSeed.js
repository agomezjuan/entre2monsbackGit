"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "grapes",
      [
        {
          name: "Cabernet Sauvignon",
          description:
            "Variedad de uva conocida por su sabor fuerte y estructura tánica. Aporta notas de frutas negras y especias.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Merlot",
          description:
            "Uva de sabor suave y afrutado. A menudo presenta sabores de frutas rojas, como cerezas y moras.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chardonnay",
          description:
            "Uva blanca versátil que produce vinos con notas de manzana, cítricos y vainilla cuando es envejecida en roble.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Pinot Noir",
          description:
            "Variedad de uva roja que produce vinos elegantes y complejos, con sabores de frutas rojas y un toque terroso.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sauvignon Blanc",
          description:
            "Uva blanca que produce vinos frescos y ácidos, con notas de hierbas, lima y frutas tropicales.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Syrah",
          description:
            "Uva tinta con sabores intensos de frutas oscuras, pimienta y especias.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tempranillo",
          description:
            "Variedad de uva española con sabores a frutos secos, cereza y notas de tabaco.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Zinfandel",
          description:
            "Uva tinta que produce vinos robustos con sabores de frutas rojas y especias.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("grapes", null, {});
  },
};
