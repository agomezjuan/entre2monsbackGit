const { Cellars } = require('../database/models');

module.exports = {
  // GET
  getAllCellars: async (req, res) => {
    try {
      const cellars = await Cellars.findAll();
      console.log("All cellars:", JSON.stringify(cellars, null, 2));
      res.json(cellars);
    } catch (error) {
      console.error("Error retrieving cellars:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postCellar: async (req, res) => {
    // Asegúrate de que la desestructuración aquí coincide con los campos enviados en la solicitud
    const { cellar_name, description } = req.body; // Corregido para usar cellar_name en lugar de cellar
    console.log(req.body);

    if (!cellar_name) { // Asegurándose de que cellar_name está presente
      return res.status(400).json({ error: "Cellar name is required" });
    }

    try {
      const createdCellar = await Cellars.create({
        cellar_name,
        description
      });
      console.log('created cellar', createdCellar);
      res.status(201).json({ message: 'Cellar created successfully', cellar: createdCellar });
    } catch (error) {
      console.error("Error creating cellar:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Cellar name must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
