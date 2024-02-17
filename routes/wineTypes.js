const express = require('express');
const router = express.Router();
const { getAllWineTypes, postWineType, deleteWineType, updateWineType } = require('../controllers/wineTypes');

router.get('/', getAllWineTypes)
router.post('/', postWineType)
router.delete('/:id', deleteWineType)
router.put('/:id', updateWineType)

module.exports = router;