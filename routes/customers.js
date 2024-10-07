const express = require("express");
const router = express.Router();
const { Customer } = require("../database/models");

const {
  getCustomers,
  createCustomer,
  deleteCustomer,
} = require("../controllers/customers");

router.get("/", getCustomers);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
