const express = require("express");
const router = express.Router();
const {
  getAllStocks,
  createStock,
  deleteStock,
  updateStock,
  getStockById,
  addStock,
} = require("../controllers/stocksControllers");

router.get("/", getAllStocks);
router.post("/", createStock);
router.delete("/:id", deleteStock);
router.put("/:id", updateStock);
router.get("/:id", getStockById);
router.post("/add", addStock);

module.exports = router;
