"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("sales");

    // Verifica si la columna total_revenue existe antes de intentar eliminarla
    if (tableDescription.total_revenue) {
      await queryInterface.removeColumn("sales", "total_revenue");
    }

    // Verifica si la columna total_cost existe antes de intentar eliminarla
    if (tableDescription.total_cost) {
      await queryInterface.removeColumn("sales", "total_cost");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Vuelve a agregar las columnas total_revenue y total_cost en la tabla sales
    await queryInterface.addColumn("sales", "total_revenue", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
      comment: "Ingreso total generado por esta venta",
    });
    await queryInterface.addColumn("sales", "total_cost", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
      comment: "Costo total de los productos vendidos en esta venta",
    });
  },
};
