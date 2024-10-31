const express = require("express");
const router = express.Router();
const {
  getAllCellars,
  deleteCellar,
  updateCellar,
  createCellar,
  getCellarById,
} = require("../controllers/cellarsControllers");

router.get("/", getAllCellars);
router.post("/", createCellar);
router.delete("/:id", deleteCellar);
router.put("/:id", updateCellar);
router.get("/:id", getCellarById);

module.exports = router;
