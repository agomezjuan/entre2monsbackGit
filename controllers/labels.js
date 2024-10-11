const { Label, LabelCategory } = require("../database/models");

module.exports = {
  // GET all Labels
  getLabels: async (req, res) => {
    try {
      const labels = await Label.findAll({
        include: [
          {
            model: LabelCategory,
            as: "category",
          },
        ],
      });
      res.json(labels);
    } catch (error) {
      console.error("Error retrieving labels:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET a single Label by ID
  getLabelById: async (req, res) => {
    try {
      const { id } = req.params;
      const label = await Label.findByPk(id, {
        include: [
          {
            model: LabelCategory,
            as: "category",
          },
        ],
      });
      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }
      res.json(label);
    } catch (error) {
      console.error("Error retrieving label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST a new Label
  createLabel: async (req, res) => {
    const { name, description, labelCategoryId } = req.body;

    if (!name || !labelCategoryId) {
      return res
        .status(400)
        .json({ error: "Name and labelCategoryId are required" });
    }

    try {
      // Verificar si ya existe un label con el mismo nombre
      const existingLabel = await Label.findOne({ where: { name } });
      if (existingLabel) {
        return res
          .status(400)
          .json({ error: "A label with this name already exists." });
      }

      const createdLabel = await Label.create({
        name,
        description,
        labelCategoryId,
      });
      res.status(201).json({
        message: "Label created successfully",
        label: createdLabel,
      });
    } catch (error) {
      console.error("Error creating label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE a Label by ID
  deleteLabel: async (req, res) => {
    const { id } = req.params;
    try {
      const label = await Label.findByPk(id);
      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }

      await label.destroy();
      res.json({ message: `Label with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update a Label by ID
  updateLabel: async (req, res) => {
    const { id } = req.params;
    const { name, description, labelCategoryId } = req.body;

    if (!name || !labelCategoryId) {
      return res
        .status(400)
        .json({ error: "Name and labelCategoryId are required." });
    }

    try {
      const label = await Label.findByPk(id);
      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }

      await label.update({
        name,
        description,
        labelCategoryId,
      });

      res.json({
        message: `Label with ID: ${id} updated successfully`,
        label,
      });
    } catch (error) {
      console.error("Error updating label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
