"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "icons",
      [
        {
          name: "Icono Vino Tinto",
          icon_path: "/images/icons/vino-tinto.png",
          subcategory_id: 1, // ID correspondiente a una subcategoría de 'Tipos de Vino'
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Icono Vino Blanco",
          icon_path: "/images/icons/vino-blanco.png",
          subcategory_id: 1, // Mismo subcategoría_id de 'Tipos de Vino'
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Icono Región Burdeos",
          icon_path: "/images/icons/region-burdeos.png",
          subcategory_id: 3, // ID correspondiente a una subcategoría de 'Regiones Vinícolas'
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Icono Región La Rioja",
          icon_path: "/images/icons/region-la-rioja.png",
          subcategory_id: 3, // Mismo subcategoría_id de 'Regiones Vinícolas'
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Icono Maridaje Carne",
          icon_path: "/images/icons/maridaje-carne.png",
          subcategory_id: 4, // ID correspondiente a una subcategoría de 'Maridaje'
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("icons", null, {});
  },
};
