const express = require("express");
const router = express.Router();
const {
  getVintages,
  getVintageById,
  createVintage,
  updateVintage,
  deleteVintage,
} = require("../controllers/vintages");

router.get("/", getVintages);
router.get("/:id", getVintageById);
router.post("/", createVintage);
router.put("/:id", updateVintage);
router.delete("/:id", deleteVintage);

module.exports = router;
