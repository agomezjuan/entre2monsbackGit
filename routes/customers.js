const express = require("express");
const router = express.Router();
const { Customer } = require("../database/models");

const { getCustomers, createCustomer } = require("../controllers/customers");

router.get("/", getCustomers);
router.post("/", createCustomer);

module.exports = router;
