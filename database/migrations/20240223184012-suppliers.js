"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("suppliers", {
      /**
       * @param id - integer - not null - autoincrement - primary key
       * @param companyName - string - not null - unique
       * @param fiscalName - string - not null - unique
       * @param {string} NIF - not null - unique
       * @param country - string - not null
       * @param country - string - not null
       * @param city - string - not null
       * @param address - string - not null
       * @param CP - integer - not null
       * @param {string} businessPhone - not null
       * @param contactName - string - not null
       * @param contactPhone - string - not null
       * @param businessEmail - string - not null
       * @param contactEmail - string - not null
       * @param description - text - nullable
       * @param createdAt - date - not null - default CURRENT_TIMESTAMP
       * @param updatedAt - date - not null - default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
       *
       */
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fiscalName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      NIF: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CP: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      businessPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("suppliers");
  },
};
