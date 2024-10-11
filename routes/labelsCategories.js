const express = require("express");
const router = express.Router();
const {
  getAllLabelCategories,
  getLabelCategoryById,
  createLabelCategory,
  deleteLabelCategory,
  updateLabelCategory,
} = require("../controllers/labelsCategories");

router.get("/", getAllLabelCategories);
router.get("/:id", getLabelCategoryById);
router.post("/", createLabelCategory);
router.delete("/:id", deleteLabelCategory);
router.put("/:id", updateLabelCategory);

module.exports = router;
