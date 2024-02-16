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
  }
}