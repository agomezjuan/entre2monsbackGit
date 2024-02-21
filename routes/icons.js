const express = require('express');
const router = express.Router();

const {
  getAllIcons,
  postIcon,
  deleteIcon,
  updateIcon
} = require('../controllers/icons')

router.get('/', getAllIcons)
router.post('/', postIcon)
router.delete('/:id', deleteIcon)                
router.put('/:id', updateIcon)                

module.exports = router