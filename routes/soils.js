const express = require('express');
const router = express.Router();
const {Soils} = require('../database/models');
const { getAllSoils, postSoil, deleteSoil, updateSoil } = require('../controllers/soils');

router.get('/', getAllSoils)
router.post('/', postSoil)
router.delete('/:id', deleteSoil)
router.put('/:id', updateSoil)

module.exports = router;