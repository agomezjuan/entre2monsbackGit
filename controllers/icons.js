const { Icon } = require("../database/models");

module.exports = {
  // GET all Icons
  getAllIcons: async (req, res) => {
    try {
      const icons = await Icon.findAll();
      console.log("All icons:", JSON.stringify(icons, null, 2));
      res.json(icons);
    } catch (error) {
      console.error("Error retrieving icons:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST a new Icon
  postIcon: async (req, res) => {
    const { url, description } = req.body;
    console.log(req.body);

    if (!url) {
      return res.status(400).json({ error: "Icon URL is required" });
    }

    try {
      const createdIcon = await Icon.create({
        url,
        description,
      });
      console.log("Created icon:", createdIcon);
      res
        .status(201)
        .json({ message: "Icon created successfully", icon: createdIcon });
    } catch (error) {
      console.error("Error creating icon:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Icon must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE an Icon by ID
  deleteIcon: async (req, res) => {
    const { id } = req.params;
    try {
      const icon = await Icon.findByPk(id);
      if (!icon) {
        return res.status(404).json({ error: "Icon not found" });
      }

      await icon.destroy();
      res.json({ message: `Icon with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting icon:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update an Icon by ID
  updateIcon: async (req, res) => {
    const { id } = req.params;
    const { url, description } = req.body;

    try {
      const iconToUpdate = await Icon.findByPk(id);
      if (!iconToUpdate) {
        return res.status(404).json({ error: "Icon not found" });
      }

      await iconToUpdate.update({
        url,
        description,
      });

      res.json({
        message: `Icon with ID: ${id} updated successfully`,
        icon: iconToUpdate,
      });
    } catch (error) {
      console.error("Error updating icon:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
