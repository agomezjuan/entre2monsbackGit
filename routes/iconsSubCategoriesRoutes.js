const express = require("express");
const router = express.Router();

const {
  getAllIconSubcategories,
  getIconSubcategoryById,
  createIconSubcategory,
  updateIconSubcategory,
  deleteIconSubcategory,
} = require("../controllers/iconSubCategoriesControllers");

router.get("/", getAllIconSubcategories);
router.get("/:id", getIconSubcategoryById);
router.post("/", createIconSubcategory);
router.put("/:id", updateIconSubcategory);
router.delete("/:id", deleteIconSubcategory);

module.exports = router;
