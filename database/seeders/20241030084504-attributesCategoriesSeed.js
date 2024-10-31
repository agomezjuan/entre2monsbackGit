"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("attribute_categories", [
      {
        name: "Aroma",
        description:
          "Característica que describe el olor del vino, que puede variar según su origen y proceso de elaboración.",
        color: "#FFA07A", // puedes elegir el color según tus preferencias
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cuerpo",
        description:
          "Característica que indica la densidad o peso del vino en la boca, influenciado por el contenido de alcohol y taninos.",
        color: "#8B4513", // puedes elegir el color según tus preferencias
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attribute_categories", null, {
      where: {
        name: ["Aroma", "Cuerpo"],
      },
    });
  },
};
