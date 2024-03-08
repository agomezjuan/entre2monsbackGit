const { Stock } = require('../database/models'); 

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

  // POST /stocks 
  createStock: async (req, res) => {
    const { sku, amountIn, amountOut, priceId } = req.body;
    try {
      const newStock = await Stock.create({ sku, amountIn, amountOut, priceId });
      res.status(201).json(newStock);
    } catch (error) {
      console.error("Error creating stock:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE /stocks/:id
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
    const { sku, amountIn, amountOut, priceId } = req.body;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      stock.sku = sku;
      stock.amountIn = amountIn;
      stock.amountOut = amountOut;
      stock.priceId = priceId;
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


}