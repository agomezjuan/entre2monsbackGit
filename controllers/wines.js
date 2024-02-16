const {Wines} = require('../database/models')

module.exports = {
  getAllWines: async (req, res, next) => {
    try {
      const wines = await Wines.findAll();
      console.log("All wines:", JSON.stringify(wines, null, 2));
      res.json(wines);
    }catch (error) {
      console.error("Error retrieving wines:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}