const express = require("express");
const router = express.Router();
const { Regions } = require("../database/models");
const {
  getAllRegions,
  deleteRegion,
  updateRegion,
  createRegion,
  getRegionRelations,
} = require("../controllers/regionsControllers");

router.get("/", getAllRegions);
router.post("/", createRegion);
router.delete("/:id", deleteRegion);
router.put("/:id", updateRegion);
router.get("/:id/relations", getRegionRelations);

module.exports = router;
