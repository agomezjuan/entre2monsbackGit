const db = require("../database/models");
const generateSKU = require("../helpers/generateSKU");
const { adjustStockQuantity } = require("../services/stockService");

module.exports = {
  // Obtener todos los registros de Stock
  getAllStocks: async (req, res) => {
    try {
      const stocks = await db.Stock.findAll();
      res.status(200).json(stocks);
    } catch (error) {
      console.error("Error getting stocks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener un registro de Stock por ID
  getStockById: async (req, res) => {
    const { id } = req.params;
    try {
      const stock = await db.Stock.findByPk(id, {
        include: [
          {
            model: db.WineVintage,
            as: "wineVintage",
          },
        ],
      });
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      res.status(200).json(stock);
    } catch (error) {
      console.error("Error getting stock:", error);
      res.status(500).json({ error: "Error getting stock" });
    }
  },

  // Crear un nuevo registro de Stock con generación automática de SKU
  createStock: async (req, res) => {
    const { quantity, reorderLevel, wine_vintage_id } = req.body;

    if (
      quantity === undefined ||
      reorderLevel === undefined ||
      !wine_vintage_id
    ) {
      return res.status(400).json({
        error:
          "All fields are required: quantity, reorderLevel, wine_vintage_id.",
      });
    }

    const transaction = await db.sequelize.transaction();
    try {
      // Obtener el vino (Wine) directamente con el wine_vintage_id
      const wine = await db.Wine.findOne({
        where: { id: wine_vintage_id },
      });

      if (!wine) {
        throw new Error(
          "No se pudo generar el SKU. Verifica los datos de wine."
        );
      }

      // Genera el SKU usando el helper
      const sku = generateSKU(wine.id, wine.name);

      // Crear el nuevo stock con el SKU generado
      const newStock = await db.Stock.create(
        {
          sku,
          quantity,
          reorderLevel,
          wine_vintage_id,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({
        message: "Stock created successfully",
        stock: newStock,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating stock:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un registro de Stock
  updateStock: async (req, res) => {
    const { id } = req.params;
    const { sku, quantity, reorderLevel, wine_vintage_id } = req.body;

    try {
      const stock = await db.Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }

      stock.sku = sku;
      stock.quantity = quantity;
      stock.reorderLevel = reorderLevel;
      stock.wine_vintage_id = wine_vintage_id;

      await stock.save();
      res.status(200).json({
        message: "Stock updated successfully",
        stock,
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ error: "Error updating stock" });
    }
  },

  // Eliminar un registro de Stock
  deleteStock: async (req, res) => {
    const { id } = req.params;

    try {
      const stock = await db.Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }

      await stock.destroy();
      res.status(200).json({ message: "Stock deleted successfully" });
    } catch (error) {
      console.error("Error deleting stock:", error);
      res.status(500).json({ error: "Error deleting stock" });
    }
  },

  addStock: async (req, res) => {
    const { stock_id, additionalQuantity } = req.body;

    if (!stock_id || !additionalQuantity || additionalQuantity <= 0) {
      return res.status(400).json({
        error: "Both stock_id and a positive additionalQuantity are required.",
      });
    }

    const transaction = await db.sequelize.transaction();
    try {
      await adjustStockQuantity(stock_id, additionalQuantity, transaction);

      await transaction.commit();
      res.status(200).json({ message: "Stock adjusted successfully." });
    } catch (error) {
      await transaction.rollback();
      console.error("Error incrementing stock:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
