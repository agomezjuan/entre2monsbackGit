const express = require('express');
const router = express.Router();

const {
  getAllLogos,
  postLogo,
  deleteLogo,
  updateLogo
} = require('../controllers/logos')

router.get('/', getAllLogos)
router.post('/', postLogo)
router.delete('/:id', deleteLogo)                
router.put('/:id', updateLogo)                

module.exports = router