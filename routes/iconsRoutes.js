const express = require("express");
const router = express.Router();
const {
  getAllIcons,
  getIconById,
  createIcon,
  updateIcon,
  deleteIcon,
} = require("../controllers/iconsControllers");

router.get("/", getAllIcons);
router.get("/:id", getIconById);
router.post("/", createIcon);
router.put("/:id", updateIcon);
router.delete("/:id", deleteIcon);

module.exports = router;
