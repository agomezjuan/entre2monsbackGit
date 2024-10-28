// Importar sequelize para poder acceder a los modelos
const { sequelize } = require("../models");

// Función para calcular los totales de una venta específica
const calculateSaleTotals = async (saleId) => {
  try {
    // Realiza la consulta para calcular los totales de la venta
    const saleTotals = await sequelize.models.SaleDetail.findOne({
      where: { saleId },
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
      raw: true, // Devuelve solo los valores de los atributos seleccionados
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
