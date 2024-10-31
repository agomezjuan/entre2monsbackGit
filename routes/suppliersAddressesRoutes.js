const express = require("express");
const router = express.Router();

const {
  getAllSupplierAddresses,
  getSupplierAddressById,
  createSupplierAddress,
  updateSupplierAddress,
} = require("../controllers/suppliersAddressesControllers");

router.get("/", getAllSupplierAddresses);
router.get("/:id", getSupplierAddressById);
router.post("/", createSupplierAddress);
router.put("/:id", updateSupplierAddress);

module.exports = router;
