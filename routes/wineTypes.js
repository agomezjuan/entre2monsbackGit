const express = require('express');
const router = express.Router();
const { 
  getAllWineTypes, 
  deleteWineType, 
  updateWineType 
} = require('../controllers/wineTypes');

router.get('/', getAllWineTypes)
router.post('/', updateWineType)
router.delete('/:id', deleteWineType)
router.put('/:id', updateWineType)

module.exports = router;