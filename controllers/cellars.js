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
    try {
      const { cellarName, description } = req.body;
      console.log(req.body);

      if (!cellarName) {
        return res.status(400).json({ error: "Cellar name is required" });
      }

      const createdCellar = await Cellar.create({
        cellarName,
        description,
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
    try {
      const { id } = req.params;
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
    try {
      const { id } = req.params;
      const { cellarName, description } = req.body;

      const cellar = await Cellar.findByPk(id);
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }

      await cellar.update({
        cellarName,
        description,
      });

      console.log(`Updated cellar with ID: ${id}`);
      res.json({ message: `Cellar with ID: ${id} updated successfully`, cellar });
    } catch (error) {
      console.error("Error updating cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
