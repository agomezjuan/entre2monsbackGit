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

  // POST
  createInfoCreateWine: async (req, res, next) => {
    const { title, helpText } = req.body;
    try {
      const infoCreateWine = await InfoCreateWine.create({ title, helpText });
      res.status(201).json(infoCreateWine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to create the infoCreateWine' });
    }
  }
};