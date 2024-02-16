const express = require('express');
const router = express.Router();
const {Regions} = require('../database/models');
const {getAllRegions, postRegion} = require('../controllers/regions')



router.get('/', getAllRegions);

router.post('/', postRegion)

module.exports = router;