const {Regions} = require('../database/models');

module.exports = {

  // GET
  getAllRegions: async (req, res, next) => {
    try {
      const regions = await Regions.findAll();
      console.log("All regions:", JSON.stringify(regions, null, 2));
      res.json(regions);
    }catch (error) {
      console.error("Error retrieving regions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postRegion: async (req, res, next) => {
    const { region, description } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Regions))
    if (!region) {
      return res.status(400).json({ error: "Region is required" });
    }
    try {
      const createdRegion = await Regions.create({
        region,
        description
      });
      console.log('created region', createdRegion)
      res.status(201).json({message: 'Region created succesfully', region: createdRegion});
    } catch (error) {
      console.error("Error creating region:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Region type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}


  postRegion: async (req, res, next) => {
    const { region, description } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Regions))
    if (!region) {
      return res.status(400).json({ error: "Region is required" });
    }
    try {
      const createdRegion = await Regions.create({
        region,
        description
      });
      console.log('created region', createdRegion)
      res.status(201).json({message: 'Region created succesfully', region: createdRegion});
    } catch (error) {
      console.error("Error creating region:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Region type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }