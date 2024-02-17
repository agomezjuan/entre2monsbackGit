const { Logo } = require('../database/models'); 

module.exports = {
  
  // GET
  getAllLogos: async (req, res, next) => {
    try {
      const logos = await Logo.findAll();
      console.log("All logos:", JSON.stringify(logos, null, 2));
      res.json(logos);
    } catch (error) {
      console.error("Error retrieving logos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postLogo: async (req, res, next) => {
    const { logo, description } = req.body; 
    console.log(req.body);

    if (!logo) { 
      return res.status(400).json({ error: "Logo is required" });
    }

    try {
      
      const createdLogo = await Logo.create({ 
        logo,
        description
      });
      console.log('created logo', createdLogo);
      res.status(201).json({ message: 'Logo created successfully', logo: createdLogo });
    } catch (error) {
      console.error("Error creating logo:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Logo must be unique" }); 
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //DELETE
  deleteLogo: async (req, res) => {
    const { id } = req.params; 
    try {
      const logo = await Logo.findByPk(id); 
      if (!logo) {
        return res.status(404).json({ error: "Logo not found" }); 
      }
      await logo.destroy(); 
      console.log(`Deleted logo with ID: ${id}`);
      res.json({ message: `Logo with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting logo:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },
  // PUT

updateLogo: async (req, res) => {
  const { id } = req.params; 
  const { logo: newLogo, description: newDescription } = req.body;

  try {
    const logoToUpdate = await Logo.findByPk(id);
    if (!logoToUpdate) {
      return res.status(404).json({ error: "Logo not found" }); 
    }

    await logoToUpdate.update({
      logo: newLogo,
      description: newDescription, 
    });

    console.log(`Updated logo with ID: ${id}`); 
    res.json({ message: `Logo with ID: ${id} updated successfully`, logo: logoToUpdate }); 
  } catch (error) {
    console.error("Error updating logo:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
}

};
