const { Price } = require("../database/models");

module.exports = {
  // GET
  getAllPrices: async (req, res) => {
    try {
      const prices = await Price.findAll();
      console.log("All prices:", JSON.stringify(prices, null, 2));
      res.json(prices);
    } catch (error) {
      console.error("Error retrieving prices:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createPrice: async (req, res) => {
    try {
      const { priceRestaurant, priceStore, priceCost, date, stockId } =
        req.body;
      console.log(req.body);

      if (!priceRestaurant || !priceStore || !priceCost || !date) {
        // Verificación también actualizada para snake_case
        return res
          .status(400)
          .json({ error: "All (prices and date) data is required" });
      }

      const createdPrice = await Price.create({
        priceRestaurant,
        priceStore,
        priceCost,
        date,
      });
      console.log("created prices", createdPrice);
      res
        .status(201)
        .json({ message: "Prices created successfully", price: createdPrice });
    } catch (error) {
      console.error("Error creating price:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Prices must be unique" });
      }
      res.status(500).json({ error: error });
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
      console.log(`Deleted price with ID: ${id}`);
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
      const { priceRestaurant, priceStore, priceCost, date } = req.body; // Cambiado a price para alinearse con el modelo
      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }
      price.price = price;
      price.description = description;
      await price.save();
      res.status(200).json(price);
    } catch (error) {
      console.error("Error updating price:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
