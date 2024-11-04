const express = require("express");
const router = express.Router();
const {
  createOrder,
  getCustomerOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersControllers");

router.post("/", createOrder);
router.get("/:customer_id", getCustomerOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
