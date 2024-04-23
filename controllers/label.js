const { Label } = require("../database/models");

module.exports = {
  getLabels: async (req, res) => {
    try {
      const labels = await Label.findAll();
      res.json(labels);
    } catch (error) {
      console.error("Error retrieving labels:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createLabel: async (req, res) => {
    try {
      const { label, description } = req.body;

      if (!label) {
        return res.status(400).json({ error: "Label name is required" });
      }

      const createdLabel = await Label.create({
        label,
        description,
      });
      res
        .status(201)
        .json({ message: "Label created successfully", label: createdLabel });
    } catch (error) {
      console.error("Error creating label:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Label name must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLabel: async (req, res) => {
    try {
      const { id } = req.params;
      const label = await Label.findByPk(id);
      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }
      res.json(label);
    } catch (error) {
      console.error("Error retrieving label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteLabel: async (req, res) => {
    try {
      const { id } = req.params;
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

  updateLabel: async (req, res) => {
    try {
      const { id } = req.params;
      const { label, description } = req.body;

      const labelToUpdate = await Label.findByPk(id);
      if (!labelToUpdate) {
        return res.status(404).json({ error: "Label not found" });
      }

      await labelToUpdate.update({
        label,
        description,
      });

      res.json({ message: `Label with ID: ${id} updated successfully` });
    } catch (error) {
      console.error("Error updating label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
