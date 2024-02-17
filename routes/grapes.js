const express = require('express');
const router = express.Router();
const {Grapes} = require('../database/models');
const { getAllGrapes, postGrape, deleteGrapes, updateGrape } = require('../controllers/grapes');

router.get('/', getAllGrapes)
router.post('/', postGrape)
router.delete('/:id', deleteGrapes)
router.put('/:id', updateGrape)

module.exports = router