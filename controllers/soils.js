const {Soils} = require('../database/models')

module.exports = {
  getAllSoils: async (req, res, next) => {
  try {
    const soils = await Soils.findAll();
    console.log("All soils:", JSON.stringify(soils, null, 2));
    res.json(soils);
  }catch (error) {
    console.error("Error retrieving soils:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}