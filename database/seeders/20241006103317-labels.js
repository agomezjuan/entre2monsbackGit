"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("labels", [
      // Labels per Estructura
      {
        name: "Estructurat",
        description: "Vi amb una estructura robusta i ferma.",
        labelCategoriesId: 1, // Suposant que Estructura té id 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lligerament Estructurat",
        description: "Vi amb una estructura lleugera i fàcil de beure.",
        labelCategoriesId: 1, // Suposant que Estructura té id 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Molt Estructurat",
        description: "Vi amb una estructura molt marcada i potent.",
        labelCategoriesId: 1, // Suposant que Estructura té id 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Labels per Sabor
      {
        name: "Frutal",
        description: "Vi amb predominança de sabors frutals.",
        labelCategoriesId: 2, // Suposant que Sabor té id 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Espècia",
        description: "Vi amb notes especiades en el seu perfil de sabor.",
        labelCategoriesId: 2, // Suposant que Sabor té id 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Terros",
        description: "Vi amb un perfil de sabor terros.",
        labelCategoriesId: 2, // Suposant que Sabor té id 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Labels per Cos
      {
        name: "Lleuger",
        description: "Vi amb cos lleuger i suau.",
        labelCategoriesId: 3, // Suposant que Cos té id 3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mitjà",
        description: "Vi amb cos mitjà, equilibrat.",
        labelCategoriesId: 3, // Suposant que Cos té id 3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Robust",
        description: "Vi amb un cos fort i ple de caràcter.",
        labelCategoriesId: 3, // Suposant que Cos té id 3
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Labels per Acidesa
      {
        name: "Baixa Acidesa",
        description: "Vi amb baixa acidesa, suau al paladar.",
        labelCategoriesId: 4, // Suposant que Acidesa té id 4
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acidesa Mitjana",
        description: "Vi amb una acidesa equilibrada.",
        labelCategoriesId: 4, // Suposant que Acidesa té id 4
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alta Acidesa",
        description: "Vi amb alta acidesa, fresc i vibrant.",
        labelCategoriesId: 4, // Suposant que Acidesa té id 4
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Labels per Tanins
      {
        name: "Tanins Suaus",
        description: "Vi amb tanins suaus i arrodonits.",
        labelCategoriesId: 5, // Suposant que Tanins té id 5
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tanins Ferms",
        description: "Vi amb tanins ferms i ben estructurats.",
        labelCategoriesId: 5, // Suposant que Tanins té id 5
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tanins Intensos",
        description: "Vi amb tanins molt marcats i potents.",
        labelCategoriesId: 5, // Suposant que Tanins té id 5
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Labels per Aroma
      {
        name: "Aromes Florals",
        description: "Vi amb notes aromàtiques de flors.",
        labelCategoriesId: 6, // Suposant que Aroma té id 6
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aromes Frutals",
        description: "Vi amb predominança d'aromes frutals.",
        labelCategoriesId: 6, // Suposant que Aroma té id 6
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aromes Específicos",
        description: "Vi amb aromes especiats en el seu perfil.",
        labelCategoriesId: 6, // Suposant que Aroma té id 6
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("labels", null, {});
  },
};
