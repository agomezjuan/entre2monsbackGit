const express = require('express');
const router = express.Router();
const grapeController = require('../controllers/grapes');

const { 
  getAllGrapes, 
  deleteGrapes, 
  updateGrape, 
  createGrape 
} = require('../controllers/grapes');

router.get('/', getAllGrapes)
router.post('/', createGrape)
router.delete('/:id', deleteGrapes)
router.put('/:id', updateGrape)

module.exports = router