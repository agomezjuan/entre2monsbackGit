const express = require("express");
const router = express.Router();
const { Supplier } = require("../database/models");
const { getSuppliers, createSupplier } = require("../controllers/suppliers");

router.get("/", getSuppliers);
router.post("/", createSupplier);

module.exports = router;
