const {
  Icon,
  IconSubcategory,
  IconCategory,
  sequelize,
} = require("../database/models");

module.exports = {
  // Obtener todos los íconos con su subcategoría
  getAllIcons: async (req, res) => {
    try {
      const icons = await Icon.findAll({
        include: [
          {
            model: IconSubcategory,
            as: "subcategory",
            include: [
              {
                model: IconCategory,
                as: "category",
              },
            ],
          },
        ],
      });
      res.status(200).json(icons);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los íconos",
        error: error.message,
      });
    }
  },

  // Obtener un ícono por ID con subcategoría y categoría asociadas
  getIconById: async (req, res) => {
    try {
      const icon = await Icon.findByPk(req.params.id, {
        include: [
          {
            model: IconSubcategory,
            as: "subcategory",
            include: [
              {
                model: IconCategory,
                as: "category",
              },
            ],
          },
        ],
      });
      if (icon) {
        res.status(200).json(icon);
      } else {
        res.status(404).json({ message: "Ícono no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el ícono",
        error: error.message,
      });
    }
  },

  // Crear un nuevo ícono
  createIcon: async (req, res) => {
    const { name, icon_path, subcategoryId } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const newIcon = await Icon.create(
        { name, icon_path, subcategoryId },
        { transaction }
      );
      await transaction.commit();
      res.status(201).json(newIcon);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear el ícono",
        error: error.message,
      });
    }
  },

  // Actualizar un ícono por ID
  updateIcon: async (req, res) => {
    const { name, icon_path, subcategoryId } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const icon = await Icon.findByPk(req.params.id, { transaction });
      if (!icon) {
        await transaction.rollback();
        return res.status(404).json({ message: "Ícono no encontrado" });
      }

      await icon.update({ name, icon_path, subcategoryId }, { transaction });
      await transaction.commit();
      res.status(200).json(icon);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar el ícono",
        error: error.message,
      });
    }
  },

  // Eliminar un ícono por ID
  deleteIcon: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const icon = await Icon.findByPk(req.params.id, { transaction });
      if (!icon) {
        await transaction.rollback();
        return res.status(404).json({ message: "Ícono no encontrado" });
      }

      await icon.destroy({ transaction });
      await transaction.commit();
      res.status(200).json({ message: "Ícono eliminado correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar el ícono",
        error: error.message,
      });
    }
  },
};
