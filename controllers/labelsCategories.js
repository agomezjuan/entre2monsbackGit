const { LabelCategory } = require("../database/models");

module.exports = {
  // GET all Label Categories
  getAllLabelCategories: async (req, res) => {
    try {
      const labelCategories = await LabelCategory.findAll();
      res.json(labelCategories);
    } catch (error) {
      console.error("Error retrieving label categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET a single Label Category by ID
  getLabelCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const labelCategory = await LabelCategory.findByPk(id);
      if (!labelCategory) {
        return res.status(404).json({ error: "Label category not found" });
      }
      res.json(labelCategory);
    } catch (error) {
      console.error("Error retrieving label category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST a new Label Category
  createLabelCategory: async (req, res) => {
    const { name, description, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({ error: "Name and color are required" });
    }

    try {
      const createdLabelCategory = await LabelCategory.create({
        name,
        description,
        color,
      });
      res.status(201).json({
        message: "Label category created successfully",
        labelCategory: createdLabelCategory,
      });
    } catch (error) {
      console.error("Error creating label category:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: "Label category name and color must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE a Label Category by ID
  deleteLabelCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const labelCategory = await LabelCategory.findByPk(id);
      if (!labelCategory) {
        return res.status(404).json({ error: "Label category not found" });
      }

      await labelCategory.destroy();
      res.json({
        message: `Label category with ID: ${id} deleted successfully`,
      });
    } catch (error) {
      console.error("Error deleting label category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update a Label Category by ID
  updateLabelCategory: async (req, res) => {
    const { id } = req.params;
    const { name, description, color } = req.body;

    try {
      const labelCategoryToUpdate = await LabelCategory.findByPk(id);
      if (!labelCategoryToUpdate) {
        return res.status(404).json({ error: "Label category not found" });
      }

      await labelCategoryToUpdate.update({
        name,
        description,
        color,
      });

      res.json({
        message: `Label category with ID: ${id} updated successfully`,
        labelCategory: labelCategoryToUpdate,
      });
    } catch (error) {
      console.error("Error updating label category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
