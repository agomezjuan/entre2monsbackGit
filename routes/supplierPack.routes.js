const express = require("express");
const router = express.Router();

const {
  createSupplierPack,
  updateSupplierPack,
} = require("../controllers/supplierPack.controller");

// 📦 Crear proveedor completo
router.post("/create", createSupplierPack);

// ✏️ Actualizar proveedor completo (address, representative, delivery)
router.put("/update", updateSupplierPack);

module.exports = router;
