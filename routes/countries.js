const express = require("express");
const router = express.Router();
const {
  getAllCountries,
  deleteCountry,
  updateCountry,
  createCountry,
  getCountryByName,
  getCountryById,
  updateCountryByName,
} = require("../controllers/countriesControllers");

router.get("/", getAllCountries);
router.get("/:id", getCountryById);
router.get("/name/:name", getCountryByName);
router.post("/", createCountry);
router.delete("/:id", deleteCountry);
router.put("/:id", updateCountry);
router.put("/name/:name", updateCountryByName);

module.exports = router;
