const express = require('express');
const router = express.Router();
const { 
  getAllStocks, 
  createStock, 
  deleteStock, 
  updateStock, 
  getStockById 
} = require('../controllers/stocks');

router.get('/', getAllStocks);
router.post('/', createStock);
router.delete('/:id', deleteStock);
router.put('/:id', updateStock);
router.get('/:id', getStockById);


module.exports = router;