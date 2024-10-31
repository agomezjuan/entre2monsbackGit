const {
  Attribute,
  AttributeCategory,
  sequelize,
} = require("../database/models");

module.exports = {
  // Obtener todos los atributos
  getAllAttributes: async (req, res) => {
    try {
      const attributes = await Attribute.findAll({
        include: {
          model: AttributeCategory,
          as: "category",
          attributes: ["name", "description"],
        },
      });
      res.status(200).json(attributes);
    } catch (error) {
      console.error("Error al obtener los atributos:", error);
      res
        .status(500)
        .json({ message: "Error al obtener los atributos", error });
    }
  },

  // Obtener un atributo por ID
  getAttributesById: async (req, res) => {
    const { id } = req.params;
    try {
      const attribute = await Attribute.findByPk(id, {
        include: {
          model: AttributeCategory,
          as: "category",
          attributes: ["name", "description"],
        },
      });
      if (!attribute) {
        return res.status(404).json({ message: "Atributo no encontrado" });
      }
      res.status(200).json(attribute);
    } catch (error) {
      console.error("Error al obtener el atributo:", error);
      res.status(500).json({ message: "Error al obtener el atributo", error });
    }
  },

  // Crear un nuevo atributo
  createAttribute: async (req, res) => {
    const { name, description, attribute_category_id } = req.body;
    try {
      const newAttribute = await Attribute.create({
        name,
        description,
        attribute_category_id,
      });

      // Carga el atributo recién creado con su categoría
      const createdAttribute = await Attribute.findByPk(newAttribute.id, {
        include: {
          model: AttributeCategory,
          as: "category",
          attributes: ["name", "description"],
        },
      });
      res.status(201).json(createdAttribute);
    } catch (error) {
      console.error("Error al crear el atributo:", error);
      res.status(500).json({ message: "Error al crear el atributo", error });
    }
  },

  // Actualizar un atributo existente
  updateAttribute: async (req, res) => {
    const { id } = req.params;
    const { name, description, attribute_category_id } = req.body;
    try {
      const attribute = await Attribute.findByPk(id);
      if (!attribute) {
        return res.status(404).json({ message: "Atributo no encontrado" });
      }

      attribute.name = name || attribute.name;
      attribute.description = description || attribute.description;
      attribute.attribute_category_id =
        attribute_category_id || attribute.attribute_category_id;

      await attribute.save();

      const updatedAttribute = await Attribute.findByPk(attribute.id, {
        include: {
          model: AttributeCategory,
          as: "category",
          attributes: ["name", "description"],
        },
      });

      res.status(200).json(updatedAttribute);
    } catch (error) {
      console.error("Error al actualizar el atributo:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el atributo", error });
    }
  },

  // Eliminar un atributo
  deleteAttribute: async (req, res) => {
    const { id } = req.params;
    try {
      const attribute = await Attribute.findByPk(id);
      if (!attribute) {
        return res.status(404).json({ message: "Atributo no encontrado" });
      }

      await attribute.destroy();
      res.status(200).json({ message: "Atributo eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el atributo:", error);
      res.status(500).json({ message: "Error al eliminar el atributo", error });
    }
  },
};
