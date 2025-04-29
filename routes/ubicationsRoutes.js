const express = require("express");
const router = express.Router();
const { createUbicationPack } = require("../controllers/ubications.controller");

router.post("/create-pack", createUbicationPack);

module.exports = router;
