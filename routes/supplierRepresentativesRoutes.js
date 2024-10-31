const express = require("express");
const router = express.Router();

const {
  createSupplierRepresentative,
  getAllSupplierRepresentatives,
  getSupplierRepresentativeById,
  deleteSupplierRepresentative,
  updateSupplierRepresentative,
} = require("../controllers/supplierRepresentativesControllers");

router.post("/", createSupplierRepresentative);
router.get("/", getAllSupplierRepresentatives);
router.get("/:id", getSupplierRepresentativeById);
router.delete("/:id", deleteSupplierRepresentative);
router.put("/:id", updateSupplierRepresentative);

module.exports = router;
