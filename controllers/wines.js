const { Wines } = require('../database/models');

module.exports = {
  // GET
  getAllWines: async (req, res, next) => {
    try {
      const wines = await Wines.findAll();
      console.log("All wines:", JSON.stringify(wines, null, 2));
      res.json(wines);
    } catch (error) {
      console.error("Error retrieving wines:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postWine: async (req, res, next) => {
    const { 
      wine_name, 
      description, 
      price, 
      img, 
      vintage, 
      cellar_id,
      soil_id,
      country_id,
      region_id,
      wineType_id, 
    } = req.body;
    console.log(req.body);

    if (!wine_name) {
      return res.status(400).json({ error: "Wine name is required" });
    }

    try {
      const createdWine = await Wines.create({ 
        wine_name, 
        description,
        price, 
        img, 
        vintage, 
        cellar_id,
        soil_id,
        country_id,
        region_id,
        wineType_id, 
      });
      console.log('created wine', createdWine);
      res.status(201).json({ message: 'Wine created successfully', wine: createdWine });
    } catch (error) {
      console.error("Error creating wine:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Wine must be unique" }); 
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteWine: async (req, res) => {
    const { id } = req.params; 

    try {
      const wine = await Wines.findByPk(id); 
      if (!wine) {
        return res.status(404).json({ error: "Wine not found" }); 
      }

      await wine.destroy(); 
      console.log(`Deleted wine with ID: ${id}`);
      res.json({ message: `Wine with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting wine:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  }
};