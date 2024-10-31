const express = require("express");
const router = express.Router();

const {
  createSupplierDeliveryDetail,
  getAllSupplierDeliveryDetails,
  getSupplierDeliveryDetailById,
  updateSupplierDeliveryDetail,
  deleteSupplierDeliveryDetail,
} = require("../controllers/supplierDeliveryDetailsControllers");

router.post("/", createSupplierDeliveryDetail);
router.get("/", getAllSupplierDeliveryDetails);
router.get("/:id", getSupplierDeliveryDetailById);
router.put("/:id", updateSupplierDeliveryDetail);
router.delete("/:id", deleteSupplierDeliveryDetail);

module.exports = router;
