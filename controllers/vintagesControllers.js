const { Vintage, Wine, sequelize } = require("../database/models");

module.exports = {
  // Obtener todos los vintages
  getAllVintages: async (req, res) => {
    try {
      const vintages = await Vintage.findAll({
        include: [{ model: Wine, as: "wines", through: { attributes: [] } }],
      });
      res.status(200).json(vintages);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los años de cosecha",
        error: error.message,
      });
    }
  },

  // Obtener un vintage por ID
  getVintageById: async (req, res) => {
    try {
      const vintage = await Vintage.findByPk(req.params.id, {
        include: [{ model: Wine, as: "wines", through: { attributes: [] } }],
      });
      if (vintage) {
        res.status(200).json(vintage);
      } else {
        res.status(404).json({ message: "Año de cosecha no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el año de cosecha",
        error: error.message,
      });
    }
  },

  // Crear un nuevo vintage
  createVintage: async (req, res) => {
    const { year, wineIds } = req.body;
    const transaction = await sequelize.transaction();
    try {
      // Crear el vintage
      const newVintage = await Vintage.create({ year }, { transaction });

      // Asociar el vintage a los vinos si se han pasado IDs de vinos
      if (wineIds && wineIds.length) {
        const wines = await Wine.findAll({ where: { id: wineIds } });
        await newVintage.addWines(wines, { transaction });
      }

      await transaction.commit();
      res.status(201).json(newVintage);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear el año de cosecha",
        error: error.message,
      });
    }
  },

  // Actualizar un vintage por ID
  updateVintage: async (req, res) => {
    const { year, wineIds } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const vintage = await Vintage.findByPk(req.params.id, { transaction });
      if (!vintage) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Año de cosecha no encontrado" });
      }

      // Actualizar el vintage
      await vintage.update({ year }, { transaction });

      // Actualizar asociación con vinos
      if (wineIds) {
        const wines = await Wine.findAll({ where: { id: wineIds } });
        await vintage.setWines(wines, { transaction });
      }

      await transaction.commit();
      res.status(200).json(vintage);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar el año de cosecha",
        error: error.message,
      });
    }
  },

  // Eliminar un vintage por ID
  deleteVintage: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const vintage = await Vintage.findByPk(req.params.id, { transaction });
      if (!vintage) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Año de cosecha no encontrado" });
      }

      await vintage.destroy({ transaction });
      await transaction.commit();
      res
        .status(200)
        .json({ message: "Año de cosecha eliminado correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar el año de cosecha",
        error: error.message,
      });
    }
  },
};
