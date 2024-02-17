const express = require('express');
const router = express.Router();
const {Cellars} = require('../database/models');
const { getAllCellars, postCellar, deleteCellar, updateCellar } = require('../controllers/cellars');

router.get('/',getAllCellars)
router.post('/', postCellar)
router.delete('/:id', deleteCellar)
router.put('/:id', updateCellar)


module.exports = router;