const express = require("express");
const router = express.Router();

const {
  createSupplierPack,
  updateSupplierPack,
  toggleSupplierStatus, // 👈 importante agregarlo aquí
} = require("../controllers/supplierPack.controller");

// 📦 Crear proveedor completo
router.post("/create", createSupplierPack);

// ✏️ Actualizar proveedor completo (address, representative, delivery)
router.put("/update", updateSupplierPack);

// 🔄 Activar/desactivar proveedor (toggle)
router.patch("/toggle/:id", toggleSupplierStatus);

module.exports = router;
