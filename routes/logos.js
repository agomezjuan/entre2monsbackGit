const express = require('express');
const router = express.Router();
const {Logos} = require('../database/models');
const {getAllLogos} = require('../controllers/logos')

router.get('/', getAllLogos)

module.exports = router