const express = require("express");
const router = express.Router();
const { Supplier } = require("../database/models");
const {
  getSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/suppliers");

router.get("/", getSuppliers);
router.post("/", createSupplier);
router.delete("/:id", deleteSupplier);
router.put("/:id", updateSupplier);

module.exports = router;
