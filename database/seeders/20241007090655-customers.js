"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", [
      {
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@example.com",
        telf: "123456789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "María",
        lastName: "García",
        email: "maria.garcia@example.com",
        telf: "987654321",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Pedro",
        lastName: "López",
        email: "pedro.lopez@example.com",
        telf: "456789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@example.com",
        telf: "321654987",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Luis",
        lastName: "Rodríguez",
        email: "luis.rodriguez@example.com",
        telf: "654789321",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Laura",
        lastName: "Hernández",
        email: "laura.hernandez@example.com",
        telf: "147258369",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "José",
        lastName: "Gómez",
        email: "jose.gomez@example.com",
        telf: "258369147",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sofía",
        lastName: "Ramírez",
        email: "sofia.ramirez@example.com",
        telf: "369147258",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Diego",
        lastName: "Torres",
        email: "diego.torres@example.com",
        telf: "741852963",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Carmen",
        lastName: "Vázquez",
        email: "carmen.vazquez@example.com",
        telf: "852963741",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
