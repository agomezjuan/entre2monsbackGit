const express = require('express');
const router = express.Router();
const { getAllWines, postWine, deleteWine, createWine } = require('../controllers/wines');
// const verifyToken = require('../middlewares/authMiddleware');

router.get('/', getAllWines)


module.exports = router;