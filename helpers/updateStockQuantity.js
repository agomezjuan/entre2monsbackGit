const db = require("../database/models");

/**
 * Actualiza la cantidad en stock reduciéndola según la cantidad especificada.
 * @param {number} stockId - ID del inventario a actualizar.
 * @param {number} quantity - Cantidad a reducir.
 * @param {object} transaction - Objeto de transacción opcional para manejar transacciones.
 * @throws {Error} Si no hay suficiente inventario o si el inventario no existe.
 */
async function updateStockQuantity(stockId, quantity, transaction = null) {
  // Buscar el stock correspondiente
  const stock = await db.Stock.findByPk(stockId);

  if (!stock) {
    throw new Error("Stock not found.");
  }

  // Verificar si hay suficiente stock disponible
  if (stock.quantity < quantity) {
    throw new Error("Insufficient stock available.");
  }

  // Reducir el stock disponible
  stock.quantity -= quantity;
  await stock.save({ transaction });
}

module.exports = updateStockQuantity;
