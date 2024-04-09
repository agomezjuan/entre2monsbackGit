const { WineType } = require("../database/models");

module.exports = {
  // GET
  getAllWineTypes: async (req, res) => {
    try {
      const wineTypes = await WineType.findAll();
      console.log("All wineTypes:", JSON.stringify(wineTypes, null, 2));
      res.json(wineTypes);
    } catch (error) {
      console.error("Error retrieving wineTypes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createWineType: async (req, res) => {
    try {
      const { wineType, description } = req.body;
      console.log(req.body);

      // Validación básica para asegurar que el campo wineType está presente
      if (!wineType) {
        return res.status(400).json({ error: "Wine type is required" });
      }

      // Crear un nuevo tipo de vino
      const createdWineType = await WineType.create({
        wineType,
        description,
      });
      console.log("Created wineType:", createdWineType);
      res.status(200).json({
        message: "Wine type created successfully",
        wineType: createdWineType,
      });
    } catch (error) {
      console.error("Error creating wine type:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Wine type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteWineType: async (req, res) => {
    const { id } = req.params;

    try {
      const wineType = await WineType.findByPk(id);
      if (!wineType) {
        return res.status(404).json({ error: "Wine type not found" });
      }

      await wineType.destroy();
      console.log(`Deleted wine type with ID: ${id}`);
      res.json({ message: `Wine type with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting wine type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT
  updateWineType: async (req, res) => {
    const { id } = req.params;
    const { wineType } = req.body;
    console.log(req.body);

    try {
      const wineTypeToUpdate = await WineType.findByPk(id);
      if (!wineTypeToUpdate) {
        return res.status(404).json({ error: "Wine type not found" });
      }

      wineTypeToUpdate.wineType = wineType;
      await wineTypeToUpdate.save();
      console.log(`Updated wine type with ID: ${id}`);
      res.json({ message: `Wine type with ID: ${id} updated successfully` });
    } catch (error) {
      console.error("Error updating wine type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
