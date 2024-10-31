const express = require("express");
const { getSaleTotals } = require("../controllers/salesControllers");
const router = express.Router();

router.get("/sales/:saleId/totals", getSaleTotals); // Definir la ruta para obtener los totales

module.exports = router;
