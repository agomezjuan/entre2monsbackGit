const {
  createUbicationPackService,
  toggleUbicationStatusService,
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

const toggleUbicationStatus = async (req, res) => {
  try {
    console.log("📥 Toggle recibido para ID:", req.params.id);

    const result = await toggleUbicationStatusService(req.params.id);

    console.log("✅ Actualizado:", result.updated);

    return res.status(200).json({
      message: result.message,
      updated: result.updated,
    });
  } catch (error) {
    console.error("❌ Error toggleUbicationStatus (controller):", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUbicationPack,
  toggleUbicationStatus,
};
