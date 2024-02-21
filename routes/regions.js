const express = require('express');
const router = express.Router();
const {Regions} = require('../database/models');
const {
  getAllRegions,
  deleteRegion,
  updateRegion,
  createRegion
} = require('../controllers/regions')

router.get('/', getAllRegions);
router.post('/', createRegion)
router.delete('/:id', deleteRegion)
router.put('/:id', updateRegion)

module.exports = router;