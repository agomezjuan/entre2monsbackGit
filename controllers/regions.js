const { Region, Country } = require("../database/models");

module.exports = {
  // Obtener todas las regiones con el país asociado
  getAllRegions: async (req, res) => {
    try {
      const regions = await Region.findAll({
        include: [{ model: Country, as: "country" }],
      });
      res.json(regions);
    } catch (error) {
      console.error("Error retrieving regions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Crear una nueva región
  createRegion: async (req, res) => {
    const { region, countryId, description } = req.body;
    console.log("Creating region:", region, countryId, description);
    try {
      const newRegion = await Region.create({ region, countryId, description });
      res
        .status(201)
        .json({ message: "Region created successfully", data: newRegion });
    } catch (error) {
      console.error("Error creating region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar una región por ID
  updateRegion: async (req, res) => {
    const { id } = req.params;
    const { region, countryId, description } = req.body;
    try {
      const regionToUpdate = await Region.findByPk(id);
      if (!regionToUpdate) {
        return res.status(404).json({ error: "Region not found" });
      }
      await regionToUpdate.update({ region, countryId, description });
      res.json({
        message: `Region with ID: ${id} updated successfully`,
        data: regionToUpdate,
      });
    } catch (error) {
      console.error("Error updating region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Eliminar una región por ID
  deleteRegion: async (req, res) => {
    const { id } = req.params;
    try {
      const regionToDelete = await Region.findByPk(id);
      if (!regionToDelete) {
        return res.status(404).json({ error: "Region not found" });
      }
      await regionToDelete.destroy();
      res.json({ message: `Region with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
