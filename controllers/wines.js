const { Wine } = require('../database/models');

const wineController = {
  /*
  * GET - All wines
  */
  async getAllWines(req, res) {
    try {
      const wines = await Wine.findAll();
      res.json(wines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to get the wines' });
    }
  },

  /*
  * POST - Create a wine
  */
  async createWine(req, res) {
    try {
      const {
        wine, description, year, production, vineyardAltitude, img, cellarId, stockId, sulphiteId,
      } = req.body;

      if (!wine || !year || !production || !vineyardAltitude || !cellarId || !stockId || !sulphiteId) {
        return res.status(400).json({ message: 'Wine, year, production, vineyardAltitude, cellarId, stockId and sulphiteId are required' });
      }

      const createdWine = await Wine.create({
        wine,
        description,
        year,
        production,
        vineyardAltitude,
        img,
        cellarId,
        stockId,
        sulphiteId,
      });

      res.status(201).json(createdWine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to create the wine' });
    }
  },
};

module.exports = wineController;
