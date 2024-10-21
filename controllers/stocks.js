const { Stock, WineVintage } = require("../database/models");

module.exports = {
  // GET /stocks
  getAllStocks: async (req, res) => {
    try {
      const stocks = await Stock.findAll();
      res.status(200).json(stocks);
    } catch (error) {
      console.error("Error getting stocks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createStock: async (req, res) => {
    const { sku, quantityIn, quantityOut, wineVintageId } = req.body;

    // ** Check if all required fields are present **
    if (
      !sku ||
      quantityIn === undefined ||
      quantityOut === undefined ||
      !wineVintageId
    ) {
      return res.status(400).json({
        error:
          "All fields are required: sku, quantityIn, quantityOut, wineVintageId.",
      });
    }

    // ** Check if quantityIn and quantityOut are valid numbers (positive) **
    if (
      isNaN(quantityIn) ||
      quantityIn < 0 ||
      isNaN(quantityOut) ||
      quantityOut < 0
    ) {
      return res.status(400).json({
        error: "quantityIn and quantityOut must be valid positive numbers.",
      });
    }

    // ** Check if wineVintageId is a valid number **
    if (isNaN(wineVintageId)) {
      return res.status(400).json({
        error: "wineVintageId must be a valid number.",
      });
    }

    try {
      // ** Check if the wineVintageId exists in the database **
      const wineVintage = await WineVintage.findByPk(wineVintageId); // Corregir el nombre del modelo
      if (!wineVintage) {
        return res
          .status(404)
          .json({ error: `WineVintage with ID ${wineVintageId} not found.` });
      }

      // ** Create the new stock record **
      const newStock = await Stock.create({
        sku,
        quantityIn,
        quantityOut,
        wineVintageId,
      });

      return res.status(201).json({
        message: "Stock created successfully",
        stock: newStock,
      });
    } catch (error) {
      // ** Error handling **
      console.error("Error creating stock:", error);

      // ** Manage unique constraint error for SKU **
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "SKU must be unique." });
      }

      // ** Manage validation errors for fields **
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ error: error.errors.map((e) => e.message) });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ** DELETE /:id
  deleteStock: async (req, res) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      await stock.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting stock:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT /stocks/:id
  updateStock: async (req, res) => {
    const { id } = req.params;
    const { sku, quantityIn, quantityOut, wineVintageId } = req.body;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      // Actualizamos los campos del registro
      stock.sku = sku;
      stock.quantityIn = quantityIn;
      stock.quantityOut = quantityOut;
      stock.wineVintageId = wineVintageId;
      await stock.save();
      res.status(200).json(stock);
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET /stocks/:id
  getStockById: async (req, res) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      res.status(200).json(stock);
    } catch (error) {
      console.error("Error getting stock by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
