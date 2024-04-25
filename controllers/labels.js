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
    const { name, description } = req.body;
    const existingLabel = await Label.findOne({
      where: {
        name,
      },
    });
    if (existingLabel) {
      return res
        .status(400)
        .json({ error: "Already exist a label with this name" });
    }
    try {
      const createdLabel = await Label.create({
        name,
        description,
      });
      res
        .status(201)
        .json({ message: "Label created successfully", label: createdLabel });
    } catch (error) {
      console.error("Error creating label:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

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
};
