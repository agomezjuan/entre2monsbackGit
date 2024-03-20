const express = require('express');
const router = express.Router();

const {
  getAllInfoCreateWines,
  createInfoCreateWine
} = require('../controllers/infoCreateWines');

router.get('/', getAllInfoCreateWines)
router.post('/', createInfoCreateWine)

module.exports = router;