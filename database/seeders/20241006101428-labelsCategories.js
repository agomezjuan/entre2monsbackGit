"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("labelsCategories", [
      {
        name: "Estructura",
        description: "Característica que descriu la solidesa i el cos del vi.",
        color: "#8B4513", // Color marrón, representación de la estructura
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gust",
        description:
          "Percepció gustativa del vi, que pot incluir notes afruitrades, especiades, animals etc. entre altres",
        color: "#FF6347", // Color tomate, representación del sabor
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cos",
        description: "Reflexa la sensació de pes del vi en boca.",
        color: "#FFD700", // Color dorado, representación del cuerpo
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acidesa",
        description: "Descripció de la frescura i l' equilibri del vi.",
        color: "#98FB98", // Color verde claro, representación de la acidez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tanins",
        description: "Sensació d' astringéncia que prove del raïm.",
        color: "#A52A2A", // Color marrón oscuro, representación de los taninos
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aroma",
        description:
          "Perfil olfactiu del vi que pot incloure fruites. flors i espécies.",
        color: "#FF69B4", // Color rosa fuerte, representación del aroma
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("labelCategories", null, {});
  },
};
