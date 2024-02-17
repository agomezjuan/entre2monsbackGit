const { WineTypes } = require('../database/models');

module.exports = {
  // GET
  getAllWineTypes: async (req, res) => { 
    try {
      const wineTypes = await WineTypes.findAll();
      console.log("All wineTypes:", JSON.stringify(wineTypes, null, 2));
      res.json(wineTypes);
    } catch (error) { 
      console.error("Error retrieving wineTypes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postWineType: async (req, res) => { 
    const { wineType } = req.body;
    console.log(req.body);
    if (!wineType) {
      return res.status(400).json({ error: "Wine type is required" });
    }

    try {
      const createdWineType = await WineTypes.create({
        wineType
      });
      console.log('Created wine type', createdWineType); 
      res.status(201).json({ message: 'Wine type created successfully', wineType: createdWineType });
    } catch (error) {
      console.error("Error creating wine type:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Wine type name must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteWineType: async (req, res) => {
    const { id } = req.params; 

    try {
      const wineType = await WineTypes.findByPk(id); 
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
    const { wineType: newWineType } = req.body;

    try {
      const wineTypeToUpdate = await WineTypes.findByPk(id);
      if (!wineTypeToUpdate) {
        return res.status(404).json({ error: "Wine type not found" });
      }

      await wineTypeToUpdate.update({
        wineType: newWineType,
      });

      res.json({ message: `Wine type with ID: ${id} updated successfully`, wineType: wineTypeToUpdate });
    } catch (error) {
      console.error("Error updating wine type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
