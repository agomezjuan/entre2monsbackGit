const express = require('express');
const router = express.Router();
const {Cellars} = require('../database/models');
const { getAllCellars, deleteCellar, updateCellar, createCellar } = require('../controllers/cellars');

router.get('/',getAllCellars)
router.post('/', createCellar)
router.delete('/:id', deleteCellar)
router.put('/:id', updateCellar)


module.exports = router;