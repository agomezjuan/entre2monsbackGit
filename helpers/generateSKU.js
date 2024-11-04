/**
 * Genera un SKU basado en el ID del vino y el nombre del vino.
 * @param {number} wineId - El ID único del vino.
 * @param {string} wineName - El nombre del vino.
 * @returns {string} - SKU en formato `id-nombre`.
 */
function generateSKU(wineId, wineName) {
  const paddedWineId = wineId.toString().padStart(3, "0");
  const shortWineName = wineName.substring(0, 3).toUpperCase();
  return `${paddedWineId}-${shortWineName}`;
}

module.exports = generateSKU;
