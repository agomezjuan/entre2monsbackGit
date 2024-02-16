const express = require('express');
const router = express.Router();
const {Grapes} = require('../database/models');
const {getAllGrapes} = require('../controllers/regions')

router.get('/', getAllGrapes)

module.exports = router