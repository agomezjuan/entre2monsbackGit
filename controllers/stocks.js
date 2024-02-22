const { Stock } = require('../database/models'); 

module.exports = {
  // CREATE
  createStocks: async (req, res) => {
    const { sku, price_restaurant, price_ecommerce, price_cost, amount } = req.body;
    try {
      const stock = await Stock.create({
        sku,
        price_restaurant,
        price_ecommerce,
        price_cost,
        amount
      });
      res.status(201).json(stock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET
  getAllStocks: async (req, res) => {
    try {
      const stocks = await Stock.findAll();
      res.status(200).json(stocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET BY ID
  getStockById: async (req, res) => {
    const stockId = req.params.id;
    try {
      const stock = await Stock.findByPk(stockId);
      if (stock) {
        res.status(200).json(stock);
      } else {
        res.status(404).json({ error: 'Stock not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // UPDATE
  updateStock: async (req, res) => {
    const stockId = req.params.id;
    const { sku, price_restaurant, price_ecommerce, price_cost, amount } = req.body;
    try {
      const [updatedRows] = await Stock.update({
        sku,
        price_restaurant,
        price_ecommerce,
        price_cost,
        amount
      }, {
        where: { id: stockId }
      });
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Stock updated successfully' });
      } else {
        res.status(404).json({ error: 'Stock not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // DELETE
  deleteStock: async (req, res) => {
    const stockId = req.params.id;
    try {
      const deletedRows = await Stock.destroy({
        where: { id: stockId }
      });
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Stock not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
