const { Soils } = require('../database/models');

module.exports = {
  //GET
  getAllSoils: async (req, res, next) => {
    try {
      const soils = await Soils.findAll();
      console.log("All soils:", JSON.stringify(soils, null, 2));
      res.json(soils);
    } catch (error) {
      console.error("Error retrieving soils:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  postSoil: async (req, res, next) => {
    const { soil_type, description } = req.body;
    console.log(req.body);
    if (!soil_type) {
      return res.status(400).json({ error: "Soil type is required" }); // Asegúrate de que el mensaje de error coincida con el campo que estás verificando
    }
    try {
      const createdSoil = await Soils.create({ // Corregido el nombre de la variable para reflejar correctamente la acción
        soil_type,
        description
      });
      console.log('created soil', createdSoil);
      res.status(201).json({ message: 'Soil created successfully', soil: createdSoil }); // Corregido para usar la variable correcta en la respuesta
    } catch (error) {
      console.error("Error creating soil:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Soil type must be unique" }); // Asegúrate de que el mensaje de error sea claro y conciso
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};