const {
  createUbicationPackService,
} = require("../services/ubications.service");

const createUbicationPack = async (req, res) => {
  try {
    const result = await createUbicationPackService(req.body);

    return res.status(201).json({
      message: result.message,
      created: result.created, // 👈 ahora sí se envía al frontend
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUbicationPack };
