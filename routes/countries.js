const express = require('express');
const router = express.Router();
const {Country} = require('../database/models');
const { getAllCountries, deleteCountry, updateCountry, createCountry, getCountryByName, getCountryById, updateCountryByName } = require('../controllers/countries');


router.get('/', getAllCountries)
router.get('/:id', getCountryById)
router.get('/name/:name', getCountryByName)
router.post('/', createCountry)
router.delete("/:id", deleteCountry)
router.put('/:id', updateCountry)
router.put('/name/:name', updateCountryByName)


module.exports = router;