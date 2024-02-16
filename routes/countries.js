const express = require('express');
const router = express.Router();
const {Countries} = require('../database/models');
const { getAllCountries, postCountrie } = require('../controllers/countries');

// GET all cellars
router.get('/', getAllCountries)

router.post('/', postCountrie)

module.exports = router;