const express = require("express");
const router = express.Router();

const {
  createSupplierPack,
} = require("../controllers/supplierPack.controller");

router.post("/create", createSupplierPack);

module.exports = router;
