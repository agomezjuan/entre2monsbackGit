const db = require("../database/models");

/**
 * Ajusta la cantidad de stock para un producto específico.
 * @param {number} stockId - ID del stock a ajustar.
 * @param {number} quantityChange - La cantidad a ajustar (puede ser negativa).
 * @param {object} transaction - Transacción de Sequelize (opcional).
 * @throws Will throw an error si la cantidad de stock es insuficiente.
 */
const adjustStockQuantity = async (
  stockId,
  quantityChange,
  transaction = null
) => {
  // Obtener el stock actual
  const stock = await db.Stock.findByPk(stockId, { transaction });
  if (!stock) {
    throw new Error("Stock not found");
  }

  // Verificar si hay suficiente stock cuando el ajuste es una reducción
  if (quantityChange < 0 && stock.quantity < Math.abs(quantityChange)) {
    throw new Error("Insufficient stock available");
  }

  // Ajustar la cantidad de stock
  stock.quantity += quantityChange;
  await stock.save({ transaction });
};

module.exports = {
  adjustStockQuantity,
};
