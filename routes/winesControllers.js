const express = require("express");
const router = express.Router();
const { getAllWines, createWine } = require("../controllers/winesControllers");
// const verifyToken = require('../middlewares/authMiddleware');

router.get("/", getAllWines);
router.post("/", createWine);

module.exports = router;
