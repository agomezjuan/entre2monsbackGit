const db = require("../database/models");
const updateStockQuantity = require("../helpers/updateStockQuantity");
const { calculateSaleTotals } = require("../services/calculateSaleTotals");
const { adjustStockQuantity } = require("../services/stockService");

module.exports = {
  // Obtener todas las ventas
  getAllSales: async (req, res) => {
    try {
      const sales = await db.Sale.findAll({
        include: [
          {
            model: db.Stock,
            as: "stock",
          },
        ],
      });

      // Calcula los totales para cada venta
      const salesWithTotals = await Promise.all(
        sales.map(async (sale) => {
          const saleTotals = await calculateSaleTotals(sale.id);
          return {
            ...sale.get({ plain: true }),
            totals: saleTotals,
          };
        })
      );

      res.status(200).json(salesWithTotals);
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener una venta por ID
  getSaleById: async (req, res) => {
    const { id } = req.params;
    try {
      // Busca la venta
      const sale = await db.Sale.findByPk(id, {
        include: [
          {
            model: db.Stock,
            as: "stock",
          },
        ],
      });

      if (!sale) {
        return res.status(404).json({ error: "Sale not found" });
      }

      // Calcula los totales para la venta
      const saleTotals = await calculateSaleTotals(id);

      res.status(200).json({
        sale,
        totals: saleTotals, // Incluye los totales calculados en la respuesta
      });
    } catch (error) {
      console.error("Error fetching sale:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Crear una nueva venta
  createSale: async (req, res) => {
    const { stock_id, quantity, purchase_price, sale_price } = req.body;

    // Validación de campos obligatorios
    if (
      !stock_id ||
      quantity === undefined ||
      purchase_price === undefined ||
      sale_price === undefined
    ) {
      return res.status(400).json({
        error:
          "All fields are required: stock_id, quantity, purchase_price, and sale_price.",
      });
    }

    const transaction = await db.sequelize.transaction();
    try {
      // Crear la venta
      const newSale = await db.Sale.create(
        {
          stock_id,
          quantity,
          purchase_price,
          sale_price,
        },
        { transaction }
      );

      // Ajustar la cantidad de stock llamando al servicio
      await adjustStockQuantity(stock_id, -quantity, transaction);

      await transaction.commit();
      res.status(201).json({
        message: "Sale created successfully",
        sale: newSale,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating sale:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una venta existente
  updateSale: async (req, res) => {
    const { id } = req.params;
    const { stock_id, quantity, purchase_price, sale_price } = req.body;

    const transaction = await db.sequelize.transaction();
    try {
      // Buscar la venta existente
      const sale = await db.Sale.findByPk(id, { transaction });
      if (!sale) {
        await transaction.rollback();
        return res.status(404).json({ error: "Sale not found" });
      }

      // Si la cantidad se modifica, calcular la diferencia y ajustar el inventario
      if (quantity !== sale.quantity) {
        const quantityDifference = quantity - sale.quantity;

        // Verificar si el stock está disponible y actualizar usando el helper
        await updateStockQuantity(
          stock_id || sale.stock_id,
          quantityDifference,
          transaction
        );
      }

      // Actualizar los datos de la venta
      sale.stock_id = stock_id || sale.stock_id;
      sale.quantity = quantity;
      sale.purchase_price = purchase_price;
      sale.sale_price = sale_price;

      await sale.save({ transaction });
      await transaction.commit();

      res.status(200).json({
        message: "Sale updated successfully",
        sale,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating sale:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una venta
  deleteSale: async (req, res) => {
    const { id } = req.params;

    const transaction = await db.sequelize.transaction();
    try {
      const sale = await db.Sale.findByPk(id, { transaction });
      if (!sale) {
        await transaction.rollback();
        return res.status(404).json({ error: "Sale not found" });
      }

      // Restaurar el inventario al eliminar la venta
      await updateStockQuantity(sale.stock_id, -sale.quantity, transaction);

      await sale.destroy({ transaction });
      await transaction.commit();

      res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting sale:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
