const {
  IconSubcategory,
  IconCategory,
  Icon,
  sequelize,
} = require("../database/models");

module.exports = {
  // Obtener todas las subcategorías de íconos con su categoría e íconos asociados
  getAllIconSubcategories: async (req, res) => {
    try {
      const subcategories = await IconSubcategory.findAll({
        include: [
          {
            model: IconCategory,
            as: "category",
          },
          {
            model: Icon,
            as: "icons",
          },
        ],
      });
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las subcategorías de íconos",
        error: error.message,
      });
    }
  },

  // Obtener una subcategoría de íconos por ID
  getIconSubcategoryById: async (req, res) => {
    try {
      const subcategory = await IconSubcategory.findByPk(req.params.id, {
        include: [
          {
            model: IconCategory,
            as: "category",
          },
          {
            model: Icon,
            as: "icons",
          },
        ],
      });
      if (subcategory) {
        res.status(200).json(subcategory);
      } else {
        res
          .status(404)
          .json({ message: "Subcategoría de íconos no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la subcategoría de íconos",
        error: error.message,
      });
    }
  },

  // Crear una nueva subcategoría de íconos
  createIconSubcategory: async (req, res) => {
    const { name, categoryId } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const newSubcategory = await IconSubcategory.create(
        {
          name,
          categoryId,
        },
        { transaction }
      );
      await transaction.commit();
      res.status(201).json(newSubcategory);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear la subcategoría de íconos",
        error: error.message,
      });
    }
  },

  // Actualizar una subcategoría de íconos por ID
  updateIconSubcategory: async (req, res) => {
    const { name, categoryId } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const subcategory = await IconSubcategory.findByPk(req.params.id, {
        transaction,
      });
      if (!subcategory) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Subcategoría de íconos no encontrada" });
      }

      await subcategory.update(
        {
          name,
          categoryId,
        },
        { transaction }
      );
      await transaction.commit();
      res.status(200).json(subcategory);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar la subcategoría de íconos",
        error: error.message,
      });
    }
  },

  // Eliminar una subcategoría de íconos por ID
  deleteIconSubcategory: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const subcategory = await IconSubcategory.findByPk(req.params.id, {
        transaction,
      });
      if (!subcategory) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Subcategoría de íconos no encontrada" });
      }

      await subcategory.destroy({ transaction });
      await transaction.commit();
      res
        .status(200)
        .json({ message: "Subcategoría de íconos eliminada correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar la subcategoría de íconos",
        error: error.message,
      });
    }
  },
};
