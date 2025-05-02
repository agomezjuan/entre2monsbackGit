const express = require("express");
const router = express.Router();
const {
  getAllDOs,
  getDOById,
  createDO,
  updateDO,
  deleteDO,
  getRegionRelations,
} = require("../controllers/dosControllers");

// Definir las rutas
router.get("/", getAllDOs);
router.get("/:id", getDOById);
router.post("/", createDO);
router.put("/:id", updateDO);
router.delete("/:id", deleteDO);
router.get("/:id/relations", getRegionRelations);

module.exports = router;
