const { Soil } = require("../database/models");

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

  // Crear un suelo
  createSoil: async (req, res) => {
    const { soil, description, effect } = req.body;
    if (!soil) {
      return res.status(400).json({ error: "Soil is required" });
    }
    try {
      const newSoil = await Soil.create({ soil, description, effect });
      res
        .status(201)
        .json({ message: "Soil created successfully", soil: newSoil });
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
      console.error("Error getting soil by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar un suelo por ID
  updateSoil: async (req, res) => {
    const { id } = req.params;
    const { soil, description, effect } = req.body;
    try {
      const soilToUpdate = await Soil.findByPk(id);
      if (!soilToUpdate) {
        return res.status(404).json({ error: "Soil not found" });
      }
      await soilToUpdate.update({ soil, description, effect });

      res.json({
        message: `Soil with ID: ${id} updated successfully`,
        soil: soilToUpdate,
      });
    } catch (error) {
      console.error("Error updating soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Borrar un suelo por ID
  deleteSoil: async (req, res) => {
    const { id } = req.params;
    try {
      const soil = await Soil.findByPk(id);
      if (!soil) {
        return res.status(404).json({ error: "Soil not found" });
      }
      await soil.destroy();
      res
        .status(200)
        .json({ message: `Soil with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // borrar suelo por nombre
  deleteSoilByName: async (req, res) => {
    const { soil_type } = req.params;
    try {
      const soil = await Soil.findOne({ where: { soil_type } });
      if (!soil) {
        return res.status(404).json({ error: "Soil not found" });
      }
      await soil.destroy();
      res.status(204).json();
    } catch (error) {
      console.error("Error deleting soil:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = soilController;
