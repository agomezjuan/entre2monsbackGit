"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "attribute_categories",
      "attribute_type_id",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "attribute_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "attribute_categories",
      "attribute_type_id"
    );
  },
};
