const express = require('express');
const router = express.Router();
const {Wines} = require('../database/models');
const { getAllWines } = require('../controllers/wines');

// GET all cellars
router.get('/', getAllWines)

module.exports = router;