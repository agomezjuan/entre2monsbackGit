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

  createDay: async (req, res) => {
    const { name } = req.body;

    try {
      if (!name) {
        return res
          .status(400)
          .json({ message: "El campo 'name' es obligatorio" });
      }

      const existingDay = await Day.findOne({ where: { name } });

      if (existingDay) {
        return res.status(409).json({ message: "Ese día ya existe" });
      }

      const newDay = await Day.create({ name });

      res.status(201).json(newDay);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el día",
        error: error.message,
      });
    }
  },
};
