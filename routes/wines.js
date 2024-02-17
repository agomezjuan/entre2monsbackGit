const express = require('express');
const router = express.Router();
const {Wines} = require('../database/models');
const { getAllWines, postWine, deleteWine } = require('../controllers/wines');

router.get('/', getAllWines)
router.post('/', postWine)
router.delete('/:id',deleteWine)

module.exports = router;