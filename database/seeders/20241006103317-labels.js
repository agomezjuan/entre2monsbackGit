"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("labels", [
      {
        name: "Estructurat",
        description: "Vi amb una estructura robusta.",
        labelCategoryId: 1, // Suposant que correspon a l'ID a labelsCategories
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Frutal",
        description: "Vi amb predominança de sabors frutals.",
        labelCategoryId: 2, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Suau",
        description: "Vi de cos lleuger i suau.",
        labelCategoryId: 3, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tànic",
        description: "Vi amb tanins marcats.",
        labelCategoryId: 4, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aromàtic",
        description: "Vi amb aromes florals i frutals.",
        labelCategoryId: 5, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Robust",
        description: "Vi amb un cos fort i ple de caràcter.",
        labelCategoryId: 1, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dolç",
        description: "Vi amb un sabor dolç i afruitada.",
        labelCategoryId: 2, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sec",
        description: "Vi amb un perfil sec i poc ensucrat.",
        labelCategoryId: 3, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cítric",
        description: "Vi amb notes cítriques en el seu sabor.",
        labelCategoryId: 4, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Complex",
        description: "Vi amb un perfil de sabor complex i evolucionat.",
        labelCategoryId: 5, // ID corresponent
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("labels", null, {});
  },
};
