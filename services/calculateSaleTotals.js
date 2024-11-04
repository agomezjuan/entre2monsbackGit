const { Sale, sequelize } = require("../database/models"); // Asegúrate de que la ruta sea correcta

const calculateSaleTotals = async (saleId) => {
  try {
    // Realiza la consulta para calcular los totales de la venta en la tabla `sales`
    const saleTotals = await Sale.findOne({
      where: { id: saleId },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("quantity")), "totalQuantity"],
        [
          sequelize.fn("SUM", sequelize.literal("quantity * sale_price")),
          "totalRevenue",
        ],
        [
          sequelize.fn("SUM", sequelize.literal("quantity * purchase_price")),
          "totalCost",
        ],
      ],
      raw: true,
    });

    return saleTotals;
  } catch (error) {
    console.error("Error calculating sale totals:", error);
    throw error;
  }
};

module.exports = {
  calculateSaleTotals,
};
