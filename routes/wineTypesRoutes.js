const express = require("express");
const router = express.Router();
const {
  getAllWineTypes,
  createWineType,
  deleteWineType,
  updateWineType,
} = require("../controllers/wineTypesControllers");

router.get("/", getAllWineTypes);
router.post("/", createWineType);
router.delete("/:id", deleteWineType);
router.put("/:id", updateWineType);

module.exports = router;
