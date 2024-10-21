"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "suppliers",
      [
        {
          companyName: "Vins i Caves S.L.",
          fiscalName: "Vins i Caves S.L.",
          NIF: "B12345678",
          country: "Espanya",
          city: "Barcelona",
          address: "Carrer de la Vinya, 10",
          CP: "08001",
          businessPhone: "934567890",
          contactName: "Jordi Martínez",
          contactPhone: "654321987",
          businessEmail: "contacte@vinsicaves.com",
          contactEmail: "jordi@vinsicaves.com",
          description:
            "Proveïdor especialitzat en vins de qualitat de diverses regions d'Espanya.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Vins del Món",
          fiscalName: "Vins del Món S.A.",
          NIF: "A23456789",
          country: "França",
          city: "Bordeaux",
          address: "Avinguda de les Vinyes, 5",
          CP: "33000",
          businessPhone: "0556789123",
          contactName: "Marie Dupont",
          contactPhone: "612345678",
          businessEmail: "info@vinsdelmon.com",
          contactEmail: "marie@vinsdelmon.com",
          description:
            "Distribuïdor de vins francesos amb una selecció premium de vins de Bordeaux.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Bodega Argentina",
          fiscalName: "Bodega Argentina S.R.L.",
          NIF: "C34567890",
          country: "Argentina",
          city: "Mendoza",
          address: "Carrer dels Raïms, 15",
          CP: "5500",
          businessPhone: "0261456789",
          contactName: "Lucía Fernández",
          contactPhone: "1122334455",
          businessEmail: "contacto@bodegaargentina.com",
          contactEmail: "lucia@bodegaargentina.com",
          description:
            "Proveïdor de vins argentins, especialitzat en Malbec i varietats locals.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Distribuïdora de Vins Xilenos",
          fiscalName: "Distribuïdora Xile S.A.",
          NIF: "D45678901",
          country: "Xile",
          city: "Santiago",
          address: "Carrer de la Viña, 20",
          CP: "8320000",
          businessPhone: "0223456789",
          contactName: "Pedro Pérez",
          contactPhone: "987654321",
          businessEmail: "info@distribuidoraxile.com",
          contactEmail: "pedro@distribuidoraxile.com",
          description:
            "Proveïdor de vins xilenos amb un ampli catàleg de varietats i bodegues.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Proveïdors de Vi Austral",
          fiscalName: "Proveïdors Australs S.L.",
          NIF: "E56789012",
          country: "Austràlia",
          city: "Adelaida",
          address: "Carrer dels Enòlegs, 8",
          CP: "5000",
          businessPhone: "0887654321",
          contactName: "Sam Wilson",
          contactPhone: "0456781234",
          businessEmail: "contact@proveidorsaustrals.com",
          contactEmail: "sam@proveidorsaustrals.com",
          description:
            "Distribuïdor de vins d'Austràlia, especialitzat en Shiraz i Chardonnay.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
