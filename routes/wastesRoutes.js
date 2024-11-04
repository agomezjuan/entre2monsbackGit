const express = require("express");
const router = express.Router();
const {
  createWaste,
  getAllWastes,
  getWasteById,
  deleteWaste,
} = require("../controllers/wastesControllers");

router.post("/", createWaste);
router.get("/", getAllWastes);
router.get("/:id", getWasteById);
router.delete("/:id", deleteWaste);

module.exports = router;
