const express = require('express');
const router = express.Router();
const { getAllStocks, createStocks, deleteStock, updateStock, getStockById } = require('../controllers/stocks');

router.get('/', getAllStocks)
router.get('/:id', getStockById)
router.post('/', createStocks)
router.delete('/:id', deleteStock)
router.put('/:id', updateStock)


module.exports = router;