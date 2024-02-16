const {Logos} = require('../database/models');

module.exports = {
  getAllRegions: async (req, res, next) => {
    try {
      const logos = await Logos.findAll();
      console.log("All logos:", JSON.stringify(logos, null, 2));
      res.json(logos);
    }catch (error) {
      console.error("Error retrieving logos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}