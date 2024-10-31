const express = require("express");
const router = express.Router();

const { getAllDays } = require("../controllers/daysController");

router.get("/", getAllDays);

module.exports = router;
