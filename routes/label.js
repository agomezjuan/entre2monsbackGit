const express = require("express");
const router = express.Router();

const {
  getLabels,
  createLabel,
  getLabel,
  deleteLabel,
  updateLabel,
} = require("../controllers/label");

router.get("/", getLabels);
router.post("/", createLabel);
router.get("/:id", getLabel);
router.delete("/:id", deleteLabel);
router.put("/:id", updateLabel);

module.exports = router;
