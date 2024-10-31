const express = require("express");
const router = express.Router();
const {
  getAllAttributeCategories,
  getAttributeCategoryById,
  createAttributeCategory,
  deleteAttributeCategory,
  updateAttributeCategory,
} = require("../controllers/attributesCategoriesControllers");

// Definir las rutas
router.get("/", getAllAttributeCategories);
router.get("/:id", getAttributeCategoryById);
router.post("/", createAttributeCategory);
router.delete("/:id", deleteAttributeCategory);
router.put("/:id", updateAttributeCategory);

module.exports = router;
