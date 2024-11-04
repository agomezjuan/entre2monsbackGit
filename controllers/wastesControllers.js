const db = require("../database/models");
const updateStockQuantity = require("../helpers/updateStockQuantity"); // Helper para reducir el inventario

module.exports = {
  // Crear un nuevo registro de pérdida
  createWaste: async (req, res) => {
    const { stock_id, quantity, reason } = req.body;

    // Validación de campos obligatorios
    if (!stock_id || quantity === undefined) {
      return res.status(400).json({
        error: "Both stock_id and quantity are required.",
      });
    }

    const transaction = await db.sequelize.transaction();
    try {
      // Crear el registro de pérdida
      const newWaste = await db.Waste.create(
        {
          stock_id,
          quantity,
          reason,
        },
        { transaction }
      );

      // Actualizar el inventario para reflejar la pérdida
      await updateStockQuantity(stock_id, quantity, transaction);

      await transaction.commit();
      res.status(201).json({
        message: "Waste recorded successfully",
        waste: newWaste,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error recording waste:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los registros de pérdidas
  getAllWastes: async (req, res) => {
    try {
      const wastes = await db.Waste.findAll({
        include: [
          {
            model: db.Stock,
            as: "stock",
          },
        ],
      });
      res.status(200).json(wastes);
    } catch (error) {
      console.error("Error fetching wastes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener un registro de pérdida por ID
  getWasteById: async (req, res) => {
    const { id } = req.params;
    try {
      const waste = await db.Waste.findByPk(id, {
        include: [
          {
            model: db.Stock,
            as: "stock",
          },
        ],
      });

      if (!waste) {
        return res.status(404).json({ error: "Waste record not found" });
      }

      res.status(200).json(waste);
    } catch (error) {
      console.error("Error fetching waste:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Eliminar un registro de pérdida
  deleteWaste: async (req, res) => {
    const { id } = req.params;

    const transaction = await db.sequelize.transaction();
    try {
      const waste = await db.Waste.findByPk(id, { transaction });
      if (!waste) {
        await transaction.rollback();
        return res.status(404).json({ error: "Waste record not found" });
      }

      // Restaurar la cantidad al stock al eliminar el registro de pérdida
      await updateStockQuantity(waste.stock_id, -waste.quantity, transaction);

      await waste.destroy({ transaction });
      await transaction.commit();

      res.status(200).json({ message: "Waste record deleted successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting waste:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
