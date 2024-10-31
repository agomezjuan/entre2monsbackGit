"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtiene los IDs de las categorías 'aroma' y 'cuerpo'
    const [aromaCategory] = await queryInterface.sequelize.query(
      `SELECT id FROM attribute_categories WHERE name = 'aroma';`
    );
    const [cuerpoCategory] = await queryInterface.sequelize.query(
      `SELECT id FROM attribute_categories WHERE name = 'cuerpo';`
    );

    // Crea los atributos en la categoría 'aroma'
    await queryInterface.bulkInsert("attributes", [
      {
        name: "Intensidad",
        description:
          "Mide la intensidad del aroma del vino, desde suave hasta potente.",
        attribute_category_id: aromaCategory[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Persistencia",
        description:
          "Indica cuánto tiempo permanece el aroma del vino en el aire.",
        attribute_category_id: aromaCategory[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Crea los atributos en la categoría 'cuerpo'
    await queryInterface.bulkInsert("attributes", [
      {
        name: "Peso en boca",
        description:
          "Refleja la densidad y el peso percibido en la boca al beber el vino.",
        attribute_category_id: cuerpoCategory[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Textura",
        description:
          "Mide la sensación táctil en la boca, desde ligero hasta cremoso.",
        attribute_category_id: cuerpoCategory[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attributes", null, {});
  },
};
