const { Grape, Wine, sequelize } = require("../database/models");

module.exports = {
  // Obtener todas las uvas con sus vinos asociados
  getAllGrapes: async (req, res) => {
    try {
      const grapes = await Grape.findAll({
        include: [
          {
            model: Wine,
            as: "wines",
            through: { attributes: [] }, // Omitir atributos de la tabla intermedia
          },
        ],
      });
      res.status(200).json(grapes);
    } catch (error) {
      console.error("Error al obtener las uvas:", error);
      res
        .status(500)
        .json({ message: "Error al obtener las uvas", error: error.message });
    }
  },

  // Obtener una uva por ID con sus vinos asociados
  getGrapeById: async (req, res) => {
    try {
      const grape = await Grape.findByPk(req.params.id, {
        include: [
          {
            model: Wine,
            as: "wines",
            through: { attributes: [] },
          },
        ],
      });
      if (grape) {
        res.status(200).json(grape);
      } else {
        res.status(404).json({ message: "Uva no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener la uva:", error);
      res
        .status(500)
        .json({ message: "Error al obtener la uva", error: error.message });
    }
  },

  // Crear una nueva uva
  createGrape: async (req, res) => {
    const { name, description } = req.body;
    try {
      const newGrape = await Grape.create({ name, description });
      res.status(201).json(newGrape);
    } catch (error) {
      console.error("Error al crear la uva:", error);
      res
        .status(500)
        .json({ message: "Error al crear la uva", error: error.message });
    }
  },

  // Actualizar una uva por ID
  updateGrape: async (req, res) => {
    const { name, description } = req.body;
    try {
      const grape = await Grape.findByPk(req.params.id);
      if (!grape) {
        return res.status(404).json({ message: "Uva no encontrada" });
      }
      await grape.update({ name, description });
      res.status(200).json(grape);
    } catch (error) {
      console.error("Error al actualizar la uva:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar la uva", error: error.message });
    }
  },

  // Eliminar una uva por ID
  deleteGrape: async (req, res) => {
    try {
      const grape = await Grape.findByPk(req.params.id);
      if (!grape) {
        return res.status(404).json({ message: "Uva no encontrada" });
      }
      await grape.destroy();
      res.status(200).json({ message: "Uva eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la uva:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la uva", error: error.message });
    }
  },
};
