const {Cellars} = require('../database/models')

module.exports = {
  getAllCellars: async (req, res, next) => {
    try {
      const cellars = await Cellars.findAll();
      console.log("All cellars:", JSON.stringify(cellars, null, 2));
      res.json(cellars);
    }catch (error) {
      console.error("Error retrieving cellars:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}