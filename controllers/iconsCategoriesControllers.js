const {
  IconCategory,
  IconSubcategory,
  sequelize,
} = require("../database/models");

module.exports = {
  // Obtener todas las categorías de íconos con sus subcategorías
  getAllIconCategories: async (req, res) => {
    try {
      const categories = await IconCategory.findAll({
        include: {
          model: IconSubcategory,
          as: "subcategories",
        },
      });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las categorías de íconos",
        error: error.message,
      });
    }
  },

  // Obtener una categoría de íconos por ID con sus subcategorías
  getIconCategoryById: async (req, res) => {
    try {
      const category = await IconCategory.findByPk(req.params.id, {
        include: {
          model: IconSubcategory,
          as: "subcategories",
        },
      });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Categoría de íconos no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la categoría de íconos",
        error: error.message,
      });
    }
  },

  // Crear una nueva categoría de íconos
  createIconCategory: async (req, res) => {
    const { name, description } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const newCategory = await IconCategory.create(
        { name, description },
        { transaction }
      );
      await transaction.commit();
      res.status(201).json(newCategory);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear la categoría de íconos",
        error: error.message,
      });
    }
  },

  // Actualizar una categoría de íconos por ID
  updateIconCategory: async (req, res) => {
    const { name, description } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const category = await IconCategory.findByPk(req.params.id, {
        transaction,
      });
      if (!category) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Categoría de íconos no encontrada" });
      }

      await category.update({ name, description }, { transaction });
      await transaction.commit();
      res.status(200).json(category);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar la categoría de íconos",
        error: error.message,
      });
    }
  },

  // Eliminar una categoría de íconos por ID
  deleteIconCategory: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const category = await IconCategory.findByPk(req.params.id, {
        transaction,
      });
      if (!category) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Categoría de íconos no encontrada" });
      }

      await category.destroy({ transaction });
      await transaction.commit();
      res
        .status(200)
        .json({ message: "Categoría de íconos eliminada correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar la categoría de íconos",
        error: error.message,
      });
    }
  },
};
