const {
  Wine,
  sequelize,
  Cellar,
  WineType,
  Vintage,
  Grape,
  Stock,
} = require("../database/models");

module.exports = {
  // Obtener todos los vinos
  getAllWines: async (req, res) => {
    try {
      const wines = await Wine.findAll({
        include: [
          { model: Cellar, as: "cellar" },
          { model: WineType, as: "wineType" },
          { model: Vintage, as: "vintages" },
          { model: Grape, as: "grapes" },
          { model: Stock, as: "stocks" },
        ],
      });
      res.status(200).json(wines);
    } catch (error) {
      console.error("Error fetching wines:", error); // Muestra detalles del error en la consola
      res.status(500).json({
        message: "Error al obtener los vinos",
        error: error.message || error,
      });
    }
  },

  // Obtener un vino por ID
  getWineById: async (req, res) => {
    const { id } = req.params;
    try {
      const wine = await Wine.findByPk(id, {
        include: [
          { model: Cellar, as: "cellar" },
          { model: WineType, as: "wineType" },
          { model: Vintage, as: "vintages" },
          { model: Grape, as: "grapes" },
        ],
      });
      if (!wine) {
        return res.status(404).json({ message: "Vino no encontrado" });
      }
      res.status(200).json(wine);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el vino", error });
    }
  },

  // Crear un nuevo vino
  createWine: async (req, res) => {
    const {
      name,
      vineyardAltitude,
      img,
      production,
      description,
      tastingNotes,
      cellarId,
      wineTypeId,
      vintageIds,
      grapeIds,
    } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const newWine = await Wine.create(
        {
          name,
          vineyardAltitude,
          img,
          production,
          description,
          tastingNotes,
          cellarId,
          wineTypeId,
        },
        { transaction }
      );

      // Asociar vintages y grapes si existen
      if (vintageIds && vintageIds.length > 0) {
        await newWine.setVintages(vintageIds, { transaction });
      }
      if (grapeIds && grapeIds.length > 0) {
        await newWine.setGrapes(grapeIds, { transaction });
      }

      await transaction.commit();
      res.status(201).json(newWine);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al crear el vino", error });
    }
  },

  // Actualizar un vino existente por ID
  updateWine: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      vineyardAltitude,
      img,
      production,
      description,
      tastingNotes,
      cellarId,
      wineTypeId,
      vintageIds,
      grapeIds,
    } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const wine = await Wine.findByPk(id, { transaction });
      if (!wine) {
        await transaction.rollback();
        return res.status(404).json({ message: "Vino no encontrado" });
      }

      await wine.update(
        {
          name,
          vineyardAltitude,
          img,
          production,
          description,
          tastingNotes,
          cellarId,
          wineTypeId,
        },
        { transaction }
      );

      // Actualizar asociaciones
      if (vintageIds && vintageIds.length > 0) {
        await wine.setVintages(vintageIds, { transaction });
      }
      if (grapeIds && grapeIds.length > 0) {
        await wine.setGrapes(grapeIds, { transaction });
      }

      await transaction.commit();
      res.status(200).json(wine);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al actualizar el vino", error });
    }
  },

  // Eliminar un vino
  deleteWine: async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const wine = await Wine.findByPk(id, { transaction });
      if (!wine) {
        await transaction.rollback();
        return res.status(404).json({ message: "Vino no encontrado" });
      }
      await wine.destroy({ transaction });
      await transaction.commit();
      res.status(204).send();
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al eliminar el vino", error });
    }
  },
};
