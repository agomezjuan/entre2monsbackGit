const express = require("express");
const router = express.Router();
const {
  getLabels,
  getLabelById,
  createLabel,
  deleteLabel,
  updateLabel,
} = require("../controllers/labels");

// Rutas para las etiquetas (labels)
router.get("/", getLabels);
router.get("/:id", getLabelById);
router.post("/", createLabel);
router.delete("/:id", deleteLabel);
router.put("/:id", updateLabel);

module.exports = router;
