const { Icon } = require('../database/models');

module.exports = {
  
  // GET
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

  // POST
  postIcon: async (req, res) => {
    const { url, description } = req.body; 
    console.log(req.body);

    if (!url) { 
      return res.status(400).json({ error: "Icon is required" });
    }

    try {
      const createdIcon = await Icon.create({ 
        url,
        description
      });
      console.log('created icon', createdIcon);
      res.status(201).json({ message: 'Icon created successfully', icon: createdIcon });
    } catch (error) {
      console.error("Error creating icon:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Icon must be unique" }); 
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //DELETE
  deleteIcon: async (req, res) => {
    const { id } = req.params; 
    try {
      const icon = await Icon.findByPk(id); 
      if (!icon) {
        return res.status(404).json({ error: "Icon not found" }); 
      }
      await icon.destroy(); 
      console.log(`Deleted icon with ID: ${id}`);
      res.json({ message: `Icon with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting icon:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },
  // PUT
  updateIcon: async (req, res) => {
    const { id } = req.params; 
    const { icon: newIcon, description: newDescription } = req.body; // Asegurarse de que las propiedades coincidan con el modelo

    try {
      const iconToUpdate = await Icon.findByPk(id);
      if (!iconToUpdate) {
        return res.status(404).json({ error: "Icon not found" }); 
      }

      await iconToUpdate.update({
        icon: newIcon,
        description: newDescription, 
      });

      console.log(`Updated icon with ID: ${id}`); 
      res.json({ message: `Icon with ID: ${id} updated successfully`, icon: iconToUpdate }); 
    } catch (error) {
      console.error("Error updating icon:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  }
};
