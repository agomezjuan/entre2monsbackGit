const { Day } = require("../database/models");

module.exports = {
  // Obtener todos los días de la semana
  getAllDays: async (req, res) => {
    try {
      const days = await Day.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).json(days);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los días", error: error.message });
    }
  },
};
