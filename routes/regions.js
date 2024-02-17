const express = require('express');
const router = express.Router();
const {Regions} = require('../database/models');
const {
  getAllRegions,
  postRegion,
  deleteRegion,
  updateRegion
} = require('../controllers/regions')

router.get('/', getAllRegions);
router.post('/', postRegion)
router.delete('/:id', deleteRegion)
router.put('/:id', updateRegion)

module.exports = router;