const { AttributeCategory } = require("../database/models");

module.exports = {
  // Obtener todas las categorías de atributos
  getAllAttributeCategories: async (req, res) => {
    try {
      const categories = await AttributeCategory.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error al obtener las categorías de atributos:", error);
      res.status(500).json({
        message: "Error al obtener las categorías de atributos",
        error,
      });
    }
  },

  // Obtener una categoría de atributo por ID
  getAttributeCategoryById: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await AttributeCategory.findByPk(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: "Categoría de atributo no encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error("Error al obtener la categoría de atributo:", error);
      res
        .status(500)
        .json({ message: "Error al obtener la categoría de atributo", error });
    }
  },

  // Crear una nueva categoría de atributo
  createAttributeCategory: async (req, res) => {
    const { name, description, color } = req.body;
    try {
      const newCategory = await AttributeCategory.create({
        name,
        description,
        color,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error al crear la categoría de atributo:", error);
      res
        .status(500)
        .json({ message: "Error al crear la categoría de atributo", error });
    }
  },

  // Actualizar una categoría de atributo existente
  updateAttributeCategory: async (req, res) => {
    const { id } = req.params;
    const { name, description, color } = req.body;
    try {
      const category = await AttributeCategory.findByPk(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: "Categoría de atributo no encontrada" });
      }

      category.name = name || category.name;
      category.description = description || category.description;
      category.color = color || category.color;
      await category.save();

      res.status(200).json(category);
    } catch (error) {
      console.error("Error al actualizar la categoría de atributo:", error);
      res.status(500).json({
        message: "Error al actualizar la categoría de atributo",
        error,
      });
    }
  },

  // Eliminar una categoría de atributo
  deleteAttributeCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await AttributeCategory.findByPk(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: "Categoría de atributo no encontrada" });
      }
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar la categoría de atributo:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la categoría de atributo", error });
    }
  },
};
