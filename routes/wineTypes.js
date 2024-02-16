const express = require('express');
const router = express.Router();
const {WineTypes} = require('../database/models');

// GET all cellars
router.get('/', async (req, res, next) => {
  try {
    const wineTypes = await WineTypes.findAll();
    console.log("All wineTypes:", JSON.stringify(wineTypes, null, 2));
    res.json(wineTypes);
  }catch (error) {
    console.error("Error retrieving wineTypes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;