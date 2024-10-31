const express = require("express");
const router = express.Router();

const {
  getAllIconCategories,
  getIconCategoryById,
  createIconCategory,
  deleteIconCategory,
} = require("../controllers/iconsCategoriesControllers");

router.get("/", getAllIconCategories);
router.get("/:id", getIconCategoryById);
router.post("/", createIconCategory);
router.delete("/:id", deleteIconCategory);

module.exports = router;
