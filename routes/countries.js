const express = require('express');
const router = express.Router();
const {Countries} = require('../database/models');
const { getAllCountries, postCountrie, deleteCountry, updateCountrie } = require('../controllers/countries');


router.get('/', getAllCountries)
router.post('/', postCountrie)
router.delete("/:id", deleteCountry)
router.put('/:id', updateCountrie)

module.exports = router;