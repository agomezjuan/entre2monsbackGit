"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "soils",
        [
          {
            soil: "Argilós",
            description:
              "Sòl ric en argila, que reté la humitat i ajuda a mantenir les arrels sanes.",
            effect: "Aporta estructura al vi i intensifica el sabor.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Sorrenyós",
            description:
              "Sòl amb una gran proporció de sorra, que proporciona un bon drenatge.",
            effect:
              "Permet a les vinyes créixer de manera saludable amb un bon control de la humitat.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Calcari",
            description:
              "Sòl que conté carbonat de calci, conegut per la seva alcalinitat.",
            effect:
              "Proporciona mineraux importants per a les vinyes, millorant la frescor del vi.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Vespa",
            description:
              "Sòl amb una combinació de roques i minerals, que aporta una gran diversitat de nutrients.",
            effect:
              "Proporciona una estructura única al vi, millorant el seu sabor.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Humífer",
            description:
              "Sòl fèrtil amb un alt contingut orgànic, ric en nutrients.",
            effect:
              "Millora el creixement de les plantes i pot augmentar la producció de raïm.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Gres",
            description:
              "Sòl sedimentari format per partícules més grans, que permet un bon drenatge.",
            effect:
              "Aporta estructura al vi i afavoreix la maduració dels raïms.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Vulcànic",
            description:
              "Sòl ric en minerals volcànics, ideal per a varietats de vi d’alta qualitat.",
            effect:
              "Proporciona una mineralitat única que es reflecteix en el sabor del vi.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Pedregós",
            description:
              "Sòl amb una gran quantitat de pedres, que ajuda al drenatge i la calefacció.",
            effect: "Contribueix a la maduració uniforme dels raïms.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "Marga",
            description:
              "Sòl que combina argila i calç, amb bon drenatge i retenció de nutrients.",
            effect:
              "Ajuda a mantenir la humitat, la qual cosa és beneficiosa per a les vinyes.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            soil: "França",
            description:
              "Sòl ric en minerals, ideal per a varietats com el Pinot Noir i el Chardonnay.",
            effect: "Millora la complexitat i l'equilibri dels vins.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Error al insertar datos:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("soils", null, {});
  },
};
