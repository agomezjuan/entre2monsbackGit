const {Countries} = require('../database/models')

module.exports ={
  getAllCountries: async (req, res, next) => {
    try {
      const countries = await Countries.findAll();
      console.log("All countries:", JSON.stringify(countries, null, 2));
      res.json(countries);
    }catch (error) {
      console.error("Error retrieving countries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}