const {
  createUbicationPackService,
} = require("../services/ubications.service");

const createUbicationPack = async (req, res) => {
  try {
    await createUbicationPackService(req.body);
    return res.status(201).json({ message: "Ubicación creada correctamente." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUbicationPack };
