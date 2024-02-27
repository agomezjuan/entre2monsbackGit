const express = require('express');
const router = express.Router();
const priceController = require('../controllers/prices');

const { 
  getAllPrices, 
  createPrice, 
  deletePrice, 
  updatePrice 
} = require('../controllers/prices');   

router.get('/', priceController.getAllPrices);
router.post('/', priceController.createPrice);
router.delete('/:id', priceController.deletePrice);
router.put('/:id', priceController.updatePrice);

module.exports = router;