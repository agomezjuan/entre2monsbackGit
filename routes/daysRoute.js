const express = require("express");
const router = express.Router();

const { getAllDays } = require("../controllers/daysController");
const { createDay } = require("../controllers/daysController");

router.get("/", getAllDays);
router.post("/", createDay);

module.exports = router;
