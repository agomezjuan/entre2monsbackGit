const express = require("express");
const {
  getAllSoils,
  createSoil,
  getSoilById,
  updateSoil,
  deleteSoil,
  deleteSoilByName,
} = require("../controllers/soils");

const router = express.Router();

router.get("/", getAllSoils);
router.post("/", createSoil);
router.get("/:id", getSoilById);
router.put("/:id", updateSoil);
router.delete("/:id", deleteSoil);
router.delete("/:name", deleteSoilByName);

module.exports = router;
