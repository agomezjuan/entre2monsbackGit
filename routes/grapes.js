const express = require('express');
const router = express.Router();
const {Grapes} = require('../database/models');
const { getAllGrapes, postGrape } = require('../controllers/grapes');

router.get('/', getAllGrapes)

router.post('/', postGrape)

module.exports = router