const express = require('express');
const router = express.Router();
const {Soils} = require('../database/models');
const { getAllSoils, postSoil } = require('../controllers/soils');


router.get('/', getAllSoils)

router.post('/', postSoil)

module.exports = router;