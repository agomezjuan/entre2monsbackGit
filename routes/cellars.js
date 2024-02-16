const express = require('express');
const router = express.Router();
const {Cellars} = require('../database/models');
const { getAllCellars } = require('../controllers/cellars');

// GET all cellars
router.get('/',getAllCellars)

module.exports = router;