const {Grapes} = require('../database/models')

module.exports = {
  getAllGrapes:  async (req, res, next) => {
    try {
      const grapes = await Grapes.findAll();
      console.log("All regions:", JSON.stringify(grapes, null, 2));
      res.json(grapes);
    }catch (error) {
      console.error("Error retrieving grapes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}