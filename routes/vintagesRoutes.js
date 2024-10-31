const express = require("express");
const router = express.Router();
const {
  getAllVintages,
  getVintageById,
  createVintage,
  updateVintage,
  deleteVintage,
} = require("../controllers/vintagesControllers");

router.get("/", getAllVintages);
router.get("/:id", getVintageById);
router.post("/", createVintage);
router.put("/:id", updateVintage);
router.delete("/:id", deleteVintage);

module.exports = router;
