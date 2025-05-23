const {
  createSupplierPackService,
  updateSupplierPackService,
  toggleSupplierStatusService,
} = require("../services/suppliers.service");

module.exports = {
  createSupplierPackService,
  updateSupplierPackService,
};

const createSupplierPack = async (req, res) => {
  try {
    const result = await createSupplierPackService(req.body);

    res.status(201).json({
      message: "Proveedor creado correctamente.",
      created: result,
    });
  } catch (error) {
    console.error("❌ Error al crear proveedor:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateSupplierPack = async (req, res) => {
  try {
    const result = await updateSupplierPackService(req.body);

    res.status(200).json({
      message: "Proveedor actualizado correctamente.",
      updated: result,
    });
  } catch (error) {
    console.error("❌ Error al actualizar proveedor:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const toggleSupplierStatus = async (req, res) => {
  try {
    const result = await toggleSupplierStatusService(req.params.id);
    res.status(200).json({
      message: `Proveedor ${
        result.active ? "activado" : "desactivado"
      } correctamente.`,
      updated: result,
    });
  } catch (error) {
    console.error("❌ Error al cambiar estado del proveedor:", error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createSupplierPack,
  updateSupplierPack,
  toggleSupplierStatus,
};
