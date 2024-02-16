const {Countries} = require('../database/models')

module.exports ={
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
  }
}