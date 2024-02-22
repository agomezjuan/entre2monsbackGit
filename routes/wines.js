const express = require('express');
const router = express.Router();
const {Wines} = require('../database/models');
const { getAllWines, postWine, deleteWine, createWine } = require('../controllers/wines');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', getAllWines)
router.post('/', createWine)
router.delete('/:id', deleteWine)

module.exports = router;