const express = require('express');
const {
  getAllSoils, 
  createSoil, 
  getSoilById, 
  updateSoil, 
  deleteSoil 
} = require('../controllers/soils');

const router = express.Router();

router.get('/', getAllSoils);
router.post('/', createSoil);
router.get('/:id', getSoilById);
router.put('/:id', updateSoil);
router.delete('/:id', deleteSoil);

module.exports = router;
