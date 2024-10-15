"use strict";

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VintagesWinesStocks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vintageId: {
        type: Sequelize.INTEGER,
        references: { model: "vintages", key: "id" },
        onDelete: "CASCADE",
      },
      wineId: {
        type: Sequelize.INTEGER,
        references: { model: "wines", key: "id" },
        onDelete: "CASCADE",
      },
      stockId: {
        type: Sequelize.INTEGER,
        references: { model: "stocks", key: "id" },
        onDelete: "CASCADE",
      },
      priceId: {
        type: Sequelize.INTEGER,
        references: { model: "prices", key: "id" },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("VintagesWinesStocks");
  },
};
