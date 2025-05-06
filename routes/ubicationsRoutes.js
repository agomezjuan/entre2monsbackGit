const express = require("express");
const router = express.Router();
const {
  createUbicationPack,
  toggleUbicationStatus,
} = require("../controllers/ubications.controller");

router.post("/create-pack", createUbicationPack);
router.patch("/:id/toggle", toggleUbicationStatus);

router.patch("/countries/:id/toggle", (req, res) =>
  toggleUbicationStatus(req, res, "country")
);
router.patch("/regions/:id/toggle", (req, res) =>
  toggleUbicationStatus(req, res, "region")
);
router.patch("/dos/:id/toggle", (req, res) =>
  toggleUbicationStatus(req, res, "do")
);

module.exports = router;
