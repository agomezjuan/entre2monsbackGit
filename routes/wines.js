const express = require('express');
const router = express.Router();
const {Wines} = require('../database/models');
const { getAllWines, postWine } = require('../controllers/wines');

// GET all cellars
router.get('/', getAllWines)

router.post('/', postWine)

module.exports = router;