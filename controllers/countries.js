const {Country} = require('../database/models')

module.exports ={

  // GET
  getAllCountries: async (req, res, next) => {
    try {
      const countries = await Country.findAll();
      console.log("All countries:", JSON.stringify(countries, null, 2));
      res.json(countries);
    }catch (error) {
      console.error("Error retrieving countries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createCountrie: async (req, res, next) => {
    const { country, description } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Country))
    if (!country) {
      return res.status(400).json({ error: "Countrie is required" });
    }
    try {
      const createdCountrie = await Country.create({
        country,
      });
      console.log('created country', createdCountrie)
      res.status(201).json({message: 'Country created succesfully', countie: createdCountrie});
    } catch (error) {
      console.error("Error creating country:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Country type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
    deleteCountry: async (req, res) => {
    const { id } = req.params; 

    try {
      const country = await Country.findByPk(id); 
      if (!country) {
        return res.status(404).json({ error: "Country is not found" }); 
      }

      await country.destroy(); 
      console.log(`Deleted country with ID: ${id}`);
      res.json({ message: `Country with ID: ${id} deleted successfully` }); 
    } catch (error) {
      console.error("Error deleting country:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },

  // PUT
  updateCountrie: async (req, res) => {
    const { id } = req.params;
    const { country: newCountrieName } = req.body; 
    try {
      const countrieToUpdate = await Country.findByPk(id); // 
      if (!countrieToUpdate) {
        return res.status(404).json({ error: "Country not found" });
      }

      await countrieToUpdate.update({
        country: newCountrieName, 
      });

      console.log(`Updated country with ID: ${id}`);
      res.json({ message: `Country with ID: ${id} updated successfully`, country: countrieToUpdate }); 
    } catch (error) {
      console.error("Error updating country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}