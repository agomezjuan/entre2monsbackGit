const express = require('express');
const router = express.Router();
const {Logos} = require('../database/models');
const {getAllLogos, postLogo} = require('../controllers/logos')

router.get('/', getAllLogos)

router.post('/', postLogo)

module.exports = router