const { createSupplierPackService } = require("../services/suppliers.service");

const createSupplierPack = async (req, res) => {
  try {
    const result = await createSupplierPackService(req.body);
    res.status(201).json({
      message: "Proveedor creado correctamente ✅",
      created: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSupplierPack,
};
