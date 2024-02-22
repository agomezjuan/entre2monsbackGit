const { Wine } = require('../database/models');

const wineController = {
  // Crear un nuevo vino
  createWine: async (req, res) => {
    try {
      const {
        wineName,
        description,
        img,
        vintage,
        vineyard_alttitude,
        production,
        otustanding,
        cellarId,
        grapeId,
        iconId,
        soilId,
        regionId,
        wineTypeId,
        sulphiteId
      } = req.body;

      const newWine = await Wine.create({
        wineName,
        description,
        img,
        vintage,
        vineyard_alttitude,
        production,
        otustanding,
        cellarId,
        grapeId,
        iconId,
        soilId,
        regionId,
        wineTypeId,
        sulphiteId
      });

      res.status(201).json(newWine);
    } catch (error) {
      console.error("Error creating new wine:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener todos los vinos
  getAllWines: async (req, res) => {
    try {
      const wines = await Wine.findAll();
      res.status(200).json(wines);
    } catch (error) {
      console.error("Error retrieving wines:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener un vino por ID
  getWineById: async (req, res) => {
    try {
      const { id } = req.params;
      const wine = await Wine.findByPk(id);
      if (wine) {
        res.status(200).json(wine);
      } else {
        res.status(404).json({ error: "Wine not found" });
      }
    } catch (error) {
      console.error("Error finding wine:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar un vino por ID
  updateWine: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Wine.update(req.body, { where: { id } });
      if (updated[0] > 0) {
        res.status(200).json({ message: "Wine updated successfully" });
      } else {
        res.status(404).json({ error: "Wine not found" });
      }
    } catch (error) {
      console.error("Error updating wine:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Eliminar un vino por ID
  deleteWine: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Wine.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Wine not found" });
      }
    } catch (error) {
      console.error("Error deleting wine:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = wineController;
