const express = require('express');
const router = express.Router();
const {Wines} = require('../database/models');
const { getAllWines, postWine, deleteWine } = require('../controllers/wines');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', getAllWines)
router.post('/', verifyToken, postWine)
router.delete('/:id', verifyToken, deleteWine)

module.exports = router;