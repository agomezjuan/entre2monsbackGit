const { Stock } = require('../database/models'); 

module.exports = {
  // GET - Obtener todos los registros de inventario
  getAllStocks: async (req, res) => {
    try {
      const stocks = await Stock.findAll();
      res.json(stocks);
    } catch (error) {
      console.error("Error retrieving stocks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST - Crear un nuevo registro de inventario
  createStock: async (req, res) => {
    const { sku, amountIn, amountOut, priceId } = req.body;
    try {
      const createdStock = await Stock.create({ sku, amountIn, amountOut, priceId });
      res.status(201).json({ message: 'Stock created successfully', stock: createdStock });
    } catch (error) {
    console.error("Error creating stock:", error);
    res.status(400).json({ error: error.message });
    }
    
  },

  // DELETE - Eliminar un registro de inventario
  deleteStock: async (req, res) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      await stock.destroy();
      res.json({ message: `Stock with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting stock:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT - Actualizar un registro de inventario
  updateStock: async (req, res) => {
    const { id } = req.params;
    const { sku, amountIn, amountOut, priceId } = req.body;
    try {
      const stockToUpdate = await Stock.findByPk(id);
      if (!stockToUpdate) {
        return res.status(404).json({ error: "Stock not found" });
      }
      await stockToUpdate.update({ sku, amountIn, amountOut, priceId });
      res.json({ message: `Stock with ID: ${id} updated successfully`, stock: stockToUpdate });
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET - Obtener un registro de inventario por ID
  getStockById: async (req, res) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }
      res.json(stock);
    } catch (error) {
      console.error("Error retrieving stock by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
