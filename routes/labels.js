const express = require("express");
const router = express.Router();

const {
  getLabels,
  createLabel,
  deleteLabel,
} = require("../controllers/labels");

router.get("/", getLabels);
router.post("/", createLabel);
router.delete("/:id", deleteLabel);

module.exports = router;
