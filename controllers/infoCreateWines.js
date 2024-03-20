const { InfoCreateWine } = require('../database/models');

module.exports = {
  // GET
  getAllInfoCreateWines: async (req, res, next) => {
    try {
      const infoCreateWines = await InfoCreateWine.findAll();
      res.json(infoCreateWines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to get the infoCreateWines' });
    }
  },

  createInfoCreateWine: async (req, res, next) => {
    try {
      const newInfoCreateWine = await InfoCreateWine.create(req.body);
      res.json(newInfoCreateWine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to create the infoCreateWine' });
    }
  }
};