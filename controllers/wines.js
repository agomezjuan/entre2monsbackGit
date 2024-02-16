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
      wineType_id, // Corregido de 'winwType_id' a 'wineType_id' para que coincida con un nombre más lógico
    } = req.body;
    console.log(req.body);

    if (!wine_name) {
      return res.status(400).json({ error: "Wine name is required" });
    }

    try {
      const createdWine = await Wines.create({ // Corregido de 'createdRegion' a 'createdWine' para reflejar correctamente lo que se está creando
        wine_name, // Corregido para usar 'wine_name' en lugar de 'region'
        description,
        price, 
        img, 
        vintage, 
        cellar_id,
        soil_id,
        country_id,
        region_id,
        wineType_id, // Asegurarse de que este campo coincida con cómo está definido en tu modelo
      });
      console.log('created wine', createdWine);
      res.status(201).json({ message: 'Wine created successfully', wine: createdWine });
    } catch (error) {
      console.error("Error creating wine:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Wine must be unique" }); // Ajustado el mensaje de error para generalidad, ya que podría ser por cualquier campo único
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};