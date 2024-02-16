const express = require('express');
const router = express.Router();
const {Cellars} = require('../database/models');
const { getAllCellars, postCellar } = require('../controllers/cellars');

router.get('/',getAllCellars)

router.post('/', postCellar)

module.exports = router;