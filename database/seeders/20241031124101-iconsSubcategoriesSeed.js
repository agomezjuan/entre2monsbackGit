"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "icon_subcategories",
      [
        {
          name: "Wine Varieties",
          category_id: 1, // ID de la categoría a la que pertenece, ajusta según tus datos
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Aging Process",
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Region Specifics",
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tasting Notes",
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icon_subcategories", null, {});
  },
};
