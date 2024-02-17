const {Grapes} = require('../database/models')

module.exports = {

  // GET
  getAllGrapes:  async (req, res, next) => {
    try {
      const grapes = await Grapes.findAll();
      console.log("All regions:", JSON.stringify(grapes, null, 2));
      res.json(grapes);
    }catch (error) {
      console.error("Error retrieving grapes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postGrape: async (req, res, next) => {
    const { grape_type, description } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Grapes))
    if (!grape_type) {
      return res.status(400).json({ error: "Grape is required" });
    }
    try {
      const createdGrape = await Grapes.create({
        grape_type,
        description
      });
      console.log('created grape', createdGrape)
      res.status(201).json({message: 'Grape created succesfully', grape: createdGrape});
    } catch (error) {
      console.error("Error creating grape:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Grape type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteGrapes: async (req, res) => {
    const { id } = req.params; 
    try {
      const grape = await Grapes.findByPk(id); 
      if (!grape) {
        return res.status(404).json({ error: "Grape not found" }); 
      }
      await grape.destroy(); 
      console.log(`Deleted grape with ID: ${id}`);
      res.json({ message: `Grape with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting grape:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },

  // PUT
  updateGrape: async (req, res) => {
  const { id } = req.params;
  const { grape_type: newGrapeType, description: newDescription } = req.body;

  try {
    const grapeToUpdate = await Grapes.findByPk(id);
    if (!grapeToUpdate) {
      return res.status(404).json({ error: "Grape not found" });
    }

    await grapeToUpdate.update({
      grape_type: newGrapeType,
      description: newDescription, 
    });

    console.log(`Updated grape with ID: ${id}`);
    res.json({ message: `Grape with ID: ${id} updated successfully`, grape: grapeToUpdate });
  } catch (error) {
    console.error("Error updating grape:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}