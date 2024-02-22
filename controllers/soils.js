const { Soil } = require('../database/models');

const soilController = {
  // Obtener todos los suelos
  getAllSoils: async (req, res) => {
    try {
      const soils = await Soil.findAll();
      res.status(200).json(soils);
    } catch (error) {
      console.error("Error getting soils:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  // Crear un nuevo suelo
  createSoil: async (req, res) => {
    const { soil_type, description, effect } = req.body; // Cambiado a soil_type para alinearse con el modelo
    try {
      const newSoil = await Soil.create({ soil_type, description, effect });
      res.status(201).json(newSoil);
    } catch (error) {
      console.error("Error creating soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  // Obtener un suelo por ID
  getSoilById: async (req, res) => {
    const { id } = req.params;
    try {
      const soil = await Soil.findByPk(id);
      if (!soil) {
        return res.status(404).json({ error: "Soil not found" });
      }
      res.status(200).json(soil);
    } catch (error) {
      console.error("Error finding soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar un suelo por ID
  updateSoil: async (req, res) => {
    const { id } = req.params;
    const { soil_type, description, effect } = req.body; // Cambiado a soil_type para alinearse con el modelo
    try {
      const soil = await Soil.findByPk(id);
      if (!soil) {
        return res.status(404).json({ error: "Soil not found" });
      }
      await soil.update({ soil_type, description, effect });
      res.status(200).json(soil);
    } catch (error) {
      console.error("Error updating soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Eliminar un suelo por ID
  deleteSoil: async (req, res) => {
    const { id } = req.params;
    try {
      const soil = await Soil.findByPk(id);
      if (!soil) {
        return res.status(404).json({ error: "Soil not found" });
      }
      await soil.destroy();
      res.status(200).json({ message: `Soil with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = soilController;
