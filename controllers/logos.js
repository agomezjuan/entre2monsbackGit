const { Logo } = require('../database/models'); // Asegúrate de que el modelo se llama 'Logo'

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
    const { logo, description } = req.body; // Corregido para coincidir con los nombres de las propiedades esperadas
    console.log(req.body);

    // Corrección: Cambia 'region' por 'logo' para la validación requerida
    if (!logo) { // Debes verificar 'logo', no 'region'
      return res.status(400).json({ error: "Logo is required" });
    }

    try {
      // Cambia 'Logos.create' por 'Logo.create' para coincidir con la importación correcta
      const createdLogo = await Logo.create({ // Debe ser 'createdLogo', no 'createdRegion'
        logo,
        description
      });
      console.log('created logo', createdLogo);
      // Corrige la respuesta JSON para que use 'createdLogo' en lugar de 'region'
      res.status(201).json({ message: 'Logo created successfully', logo: createdLogo });
    } catch (error) {
      console.error("Error creating logo:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Logo must be unique" }); // Mensaje de error ajustado para reflejar la unicidad del 'logo'
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
