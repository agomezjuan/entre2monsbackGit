const express = require("express");
const router = express.Router();

const {
  getLabels,
  createLabel,
  deleteLabel,
  updateLabel,
} = require("../controllers/labels");

router.get("/", getLabels);
router.post("/", createLabel);
router.delete("/:id", deleteLabel);
router.put("/:id", updateLabel);

module.exports = router;
