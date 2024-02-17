const {Countries} = require('../database/models')

module.exports ={

  // GET
  getAllCountries: async (req, res, next) => {
    try {
      const countries = await Countries.findAll();
      console.log("All countries:", JSON.stringify(countries, null, 2));
      res.json(countries);
    }catch (error) {
      console.error("Error retrieving countries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postCountrie: async (req, res, next) => {
    const { countrie, description } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Countries))
    if (!countrie) {
      return res.status(400).json({ error: "Countrie is required" });
    }
    try {
      const createdCountrie = await Countries.create({
        countrie,
      });
      console.log('created countrie', createdCountrie)
      res.status(201).json({message: 'Countrie created succesfully', countrie: createdCountrie});
    } catch (error) {
      console.error("Error creating countrie:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Countrie type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
    deleteCountry: async (req, res) => {
    const { id } = req.params; 

    try {
      const countrie = await Countries.findByPk(id); 
      if (!countrie) {
        return res.status(404).json({ error: "Countrie is not found" }); 
      }

      await countrie.destroy(); 
      console.log(`Deleted countrie with ID: ${id}`);
      res.json({ message: `Countrie with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting countrie:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },

  // PUT
  updateCountrie: async (req, res) => {
    const { id } = req.params;
    const { countrie: newCountrieName } = req.body; 
    try {
      const countrieToUpdate = await Countries.findByPk(id); // 
      if (!countrieToUpdate) {
        return res.status(404).json({ error: "Countrie not found" });
      }

      await countrieToUpdate.update({
        countrie: newCountrieName, 
      });

      console.log(`Updated countrie with ID: ${id}`);
      res.json({ message: `Countrie with ID: ${id} updated successfully`, countrie: countrieToUpdate }); 
    } catch (error) {
      console.error("Error updating countrie:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}