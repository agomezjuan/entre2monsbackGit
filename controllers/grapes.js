const { Grape } = require('../database/models'); // Asegúrate de que la importación coincida con el nombre exportado del modelo

module.exports = {
  // GET
  getAllGrapes: async (req, res) => {
    try {
      const grapes = await Grape.findAll();
      res.json(grapes);
    } catch (error) {
      console.error("Error retrieving grapes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createGrape: async (req, res) => {
    const { grapeType, description } = req.body; // Usa camelCase como en el modelo
    if (!grapeType) {
      return res.status(400).json({ error: "Grape type is required" });
    }
    try {
      const createdGrape = await Grape.create({
        grapeType,
        description
      });
      res.status(201).json({message: 'Grape created successfully', grape: createdGrape});
    } catch (error) {
      console.error("Error creating grape:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteGrapes: async (req, res) => {
    const { id } = req.params;
    try {
      const grape = await Grape.findByPk(id);
      if (!grape) {
        return res.status(404).json({ error: "Grape not found" });
      }
      await grape.destroy();
      res.json({ message: `Grape with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting grape:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT
  updateGrape: async (req, res) => {
    const { id } = req.params;
    const { grapeType, description } = req.body; // Usa camelCase como en el modelo
    try {
      const grapeToUpdate = await Grape.findByPk(id);
      if (!grapeToUpdate) {
        return res.status(404).json({ error: "Grape not found" });
      }
      await grapeToUpdate.update({
        grapeType,
        description
      });
      res.json({ message: `Grape with ID: ${id} updated successfully`, grape: grapeToUpdate });
    } catch (error) {
      console.error("Error updating grape:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
