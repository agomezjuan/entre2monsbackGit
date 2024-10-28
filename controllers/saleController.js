const { calculateSaleTotals } = require("../services/saleService");

const getSaleTotals = async (req, res) => {
  try {
    const { saleId } = req.params; // Obtener el saleId de los parámetros de la URL
    const totals = await calculateSaleTotals(saleId); // Llamar al servicio para calcular los totales
    res.status(200).json(totals); // Enviar la respuesta con los totales calculados
  } catch (error) {
    res.status(500).json({ error: "Error calculating sale totals" });
  }
};

module.exports = { getSaleTotals };
