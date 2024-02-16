const express = require('express');
const router = express.Router();
const {Countries} = require('../database/models');
const { getAllCountries } = require('../controllers/countries');

// GET all cellars
router.get('/', getAllCountries)

module.exports = router;