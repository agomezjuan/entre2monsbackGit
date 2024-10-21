const { Price } = require("../database/models");

module.exports = {
  // GET
  getAllPrices: async (req, res) => {
    try {
      const prices = await Price.findAll();
      res.json(prices);
    } catch (error) {
      console.error("Error retrieving prices:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createPrice: async (req, res) => {
    try {
      const { purchasePrice, salePrice } = req.body;

      // Validación de los campos (sin necesidad de `date`)
      if (!purchasePrice || !salePrice) {
        return res.status(400).json({
          error: "Los campos purchasePrice y salePrice son obligatorios.",
        });
      }

      // Crear un nuevo registro en la tabla de precios
      const newPrice = await Price.create({
        purchasePrice,
        salePrice,
        // No necesitas pasar 'date', Sequelize lo asigna automáticamente
      });

      return res.status(201).json(newPrice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear el precio." });
    }
  },

  // DELETE
  deletePrice: async (req, res) => {
    try {
      const { id } = req.params;
      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }

      await price.destroy();
      res.json({ message: `Price with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting price:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT
  updatePrice: async (req, res) => {
    try {
      const { id } = req.params;
      const { purchasePrice, salePrice, date } = req.body;

      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }

      // Actualizamos los campos
      price.purchasePrice = purchasePrice || price.purchasePrice;
      price.salePrice = salePrice || price.salePrice;
      price.date = date || price.date;

      await price.save();
      res.status(200).json({ message: "Price updated successfully", price });
    } catch (error) {
      console.error("Error updating price:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
