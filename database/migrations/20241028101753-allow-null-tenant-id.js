"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "tenant_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "tenants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "tenant_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
