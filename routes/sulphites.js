const express = require('express');
const router = express.Router();
const {Sulphite} = require('../database/models');
const { 
  getAllSulphites, 
  deleteSulphite, 
  createSulphite,
  updateSulphite,
  getSulphiteById
} = require('../controllers/sulphites');

router.get('/',getAllSulphites)
router.post('/', createSulphite)
router.delete('/:id', deleteSulphite)
router.put('/:id', updateSulphite)
router.get('/:id', getSulphiteById)

module.exports = router;