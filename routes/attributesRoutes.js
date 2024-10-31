const express = require("express");
const router = express.Router();
const {
  getAllAttributes,
  getAttributesById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} = require("../controllers/attributesControllers");

router.get("/", getAllAttributes);
router.get("/:id", getAttributesById);
router.post("/", createAttribute);
router.put("/:id", updateAttribute);
router.delete("/:id", deleteAttribute);

module.exports = router;
