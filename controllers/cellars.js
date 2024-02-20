const { Cellar } = require('../database/models');

module.exports = {
  // GET
  getAllCellars: async (req, res) => {
    try {
      const cellars = await Cellar.findAll();
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
    const { cellarName, description } = req.body; // Corregido para usar cellar_name en lugar de cellar
    console.log(req.body);

    if (!cellarName) { // Asegurándose de que cellar_name está presente
      return res.status(400).json({ error: "Cellar name is required" });
    }

    try {
      const createdCellar = await Cellar.create({
        cellarName,
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
  },

  // DELETE
  deleteCellar: async (req, res) => {
    const { id } = req.params; 

    try {
      const cellar = await Cellar.findByPk(id); 
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" }); 
      }

      await cellar.destroy(); 
      console.log(`Deleted cellar with ID: ${id}`);
      res.json({ message: `Cellar with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting cellar:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },

  // PUT
  updateCellar: async (req, res) => {
    const { id } = req.params; 
    const { cellarName, description } = req.body; 

    try {
      const cellar = await Cellar.findByPk(id); 
      if (!cellarName) {
        return res.status(404).json({ error: "Cellar not found" }); 
      }

      await cellar.update({
        cellarName,
        description
      });

      console.log(`Updated cellar with ID: ${id}`);
      res.json({ message: `Cellar with ID: ${id} updated successfully`, cellar: cellar }); 
    } catch (error) {
      console.error("Error updating cellar:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  }
};

