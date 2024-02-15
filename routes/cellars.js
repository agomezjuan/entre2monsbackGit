const express = require('express');
const router = express.Router();
const Cellars = require('../database/models/cellars.js');

// GET all cellars
router.get('/', async (req, res, next) => {
  try {
    const cellars = await Cellars.findAll();
    console.log("All cellars:", JSON.stringify(regions, null, 2));
    res.json(cellars);
  }catch (error) {
    console.error("Error retrieving cellars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;