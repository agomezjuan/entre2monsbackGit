const express = require('express');
const router = express.Router();
const {Soils} = require('../database/models');
const { getAllSoils } = require('../controllers/soils');

// GET all cellars
router.get('/', getAllSoils)

module.exports = router;