"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stocks",
      [
        {
          wineId: 1,
          sku: "RCGC2018",
          quantityIn: 500,
          quantityOut: 0,
          purchasePrice: 12000.0,
          salePrice: 14000.0,
        },
        {
          wineId: 2,
          sku: "EGC2019",
          quantityIn: 400,
          quantityOut: 0,
          purchasePrice: 9000.0,
          salePrice: 11000.0,
        },
        {
          wineId: 3,
          sku: "PM2017",
          quantityIn: 1000,
          quantityOut: 200,
          purchasePrice: 200.0,
          salePrice: 250.0,
        },
        {
          wineId: 4,
          sku: "CM2018",
          quantityIn: 600,
          quantityOut: 50,
          purchasePrice: 300.0,
          salePrice: 400.0,
        },
        {
          wineId: 5,
          sku: "CM2018",
          quantityIn: 800,
          quantityOut: 0,
          purchasePrice: 500.0,
          salePrice: 700.0,
        },
        {
          wineId: 6,
          sku: "PB2019",
          quantityIn: 700,
          quantityOut: 100,
          purchasePrice: 300.0,
          salePrice: 350.0,
        },
        {
          wineId: 7,
          sku: "MCI2020",
          quantityIn: 20000,
          quantityOut: 1000,
          purchasePrice: 35.0,
          salePrice: 50.0,
        },
        {
          wineId: 8,
          sku: "MCR2020",
          quantityIn: 10000,
          quantityOut: 500,
          purchasePrice: 40.0,
          salePrice: 55.0,
        },
        {
          wineId: 9,
          sku: "VSU2010",
          quantityIn: 1500,
          quantityOut: 50,
          purchasePrice: 200.0,
          salePrice: 350.0,
        },
        {
          wineId: 10,
          sku: "VB52018",
          quantityIn: 4000,
          quantityOut: 200,
          purchasePrice: 100.0,
          salePrice: 150.0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
