const express = require("express");
const router = express.Router();

const userController = require("../controllers/users"); // activalo cuando tengas uno
router.get("/", userController.getAllUsers);

module.exports = router;
