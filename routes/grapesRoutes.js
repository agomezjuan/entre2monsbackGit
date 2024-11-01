const express = require("express");
const router = express.Router();

const {
  getAllGrapes,
  deleteGrape,
  updateGrape,
  createGrape,
} = require("../controllers/grapesControllers");

router.get("/", getAllGrapes);
router.post("/", createGrape);
router.delete("/:id", deleteGrape);
router.put("/:id", updateGrape);

module.exports = router;
