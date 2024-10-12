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
      const { costPrice, sellPrice } = req.body;

      // Validación de los campos (sin necesidad de `date`)
      if (!costPrice || !sellPrice) {
        return res
          .status(400)
          .json({
            error: "Los campos costPrice y sellPrice son obligatorios.",
          });
      }

      // Crear un nuevo registro en la tabla de precios
      const newPrice = await Price.create({
        costPrice,
        sellPrice,
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
      const { costPrice, sellPrice, date } = req.body;

      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }

      // Actualizamos los campos
      price.costPrice = costPrice || price.costPrice;
      price.sellPrice = sellPrice || price.sellPrice;
      price.date = date || price.date;

      await price.save();
      res.status(200).json({ message: "Price updated successfully", price });
    } catch (error) {
      console.error("Error updating price:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
