"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "suppliers",
      [
        {
          companyName: "Vins i Caves S.A.",
          fiscalName: "Vins i Caves S.A.",
          NIF: "A12345678",
          country: "Spain",
          city: "Barcelona",
          address: "Carrer de la Vinya, 12",
          CP: "08080",
          businessPhone: "934567890",
          contactName: "Joan",
          contactPhone: "678123456",
          businessEmail: "email1@email1.com",
          contactEmail: "contact1@contact1.com",
          description: "A wine and cava supplier",
        },
        {
          companyName: "Fruites i Verdures S.A.",
          fiscalName: "Fruites i Verdures S.A.",
          NIF: "B12345678",
          country: "Spain",
          city: "Barcelona",
          address: "Carrer de la Poma, 12",
          CP: "08080",
          businessPhone: "934567890",
          contactName: "Maria",
          contactPhone: "678123456",
          businessEmail: "email2@email2.com",
          contactEmail: "contact2@contact2.com",
          description: "A fruits and vegetables supplier",
        },
        {
          companyName: "Carns i Embotits S.A.",
          fiscalName: "Carns i Embotits S.A.",
          NIF: "C12345678",
          country: "Spain",
          city: "Barcelona",
          address: "Carrer de la Carn, 12",
          CP: "08080",
          businessPhone: "934567890",
          contactName: "Pere",
          contactPhone: "678123456",
          businessEmail: "email3@email3.com",
          contactEmail: "contact3@contact3.com",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
