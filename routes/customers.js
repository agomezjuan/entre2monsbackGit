const express = require("express");
const router = express.Router();
const { Customer } = require("../database/models");

const {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers");

router.get("/", getCustomers);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);

module.exports = router;
