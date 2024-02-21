const express = require('express');
const router = express.Router();
const {Country} = require('../database/models');
const { getAllCountries, deleteCountry, updateCountrie, createCountrie } = require('../controllers/countries');


router.get('/', getAllCountries)
router.post('/', createCountrie)
router.delete("/:id", deleteCountry)
router.put('/:id', updateCountrie)

module.exports = router;