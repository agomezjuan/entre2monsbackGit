// stockService.js
const db = require("../database/models");

/**
 * Ajusta la cantidad de stock para un producto específico.
 */
async function adjustStockQuantity(
  stockId,
  quantityChange,
  transaction = null
) {
  const stock = await db.Stock.findByPk(stockId, { transaction });
  if (!stock) {
    throw new Error("Stock not found");
  }

  if (quantityChange < 0 && stock.quantity < Math.abs(quantityChange)) {
    throw new Error("Insufficient stock available");
  }

  stock.quantity += quantityChange;
  await stock.save({ transaction });
}

// Exportar la función en el formato CommonJS
module.exports = {
  adjustStockQuantity,
};
