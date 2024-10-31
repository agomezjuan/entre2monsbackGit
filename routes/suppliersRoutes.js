const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/suppliersControllers");

router.get("/", getAllSuppliers);
router.post("/", createSupplier);
router.delete("/:id", deleteSupplier);
router.put("/:id", updateSupplier);

module.exports = router;
