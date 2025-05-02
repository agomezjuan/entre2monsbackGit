const express = require("express");
const router = express.Router();
const {
  createUbicationPack,
  toggleUbicationStatus,
} = require("../controllers/ubications.controller");

router.post("/create-pack", createUbicationPack);
router.patch("/:id/toggle", toggleUbicationStatus);

module.exports = router;
