const db = require("../database/models");
const { calculateSaleTotals } = require("../services/calculateSaleTotals");

module.exports = {
  // Crear un nuevo registro de consumo
  createOrder: async (req, res) => {
    const { customer_id, sale_id, wine_id, quantity } = req.body;

    // Validación de campos obligatorios
    if (!customer_id || !sale_id || !wine_id || quantity === undefined) {
      return res.status(400).json({
        error:
          "All fields are required: customer_id, sale_id, wine_id, and quantity.",
      });
    }

    const transaction = await db.sequelize.transaction();
    try {
      const newOrder = await db.Order.create(
        {
          customer_id,
          sale_id,
          wine_id,
          quantity,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Error creating order" });
    }
  },

  // Obtener todos los registros de consumo para un cliente específico
  getCustomerOrders: async (req, res) => {
    const { customer_id } = req.params;

    const transaction = await db.sequelize.transaction();
    try {
      // Obtén los pedidos del cliente
      const orders = await db.Order.findAll(
        {
          where: { customer_id },
          include: [
            {
              model: db.Sale,
              as: "sale",
              attributes: ["id", "created_at"], // Remueve `total_amount`
            },
            {
              model: db.Wine,
              as: "wine",
              attributes: ["id", "name"],
            },
          ],
        },
        { transaction }
      );

      // Calcula los totales para cada pedido
      const ordersWithTotals = await Promise.all(
        orders.map(async (order) => {
          const saleTotals = await calculateSaleTotals(order.sale_id);
          return {
            ...order.get({ plain: true }),
            sale: {
              ...order.sale.get({ plain: true }),
              total_amount: saleTotals.totalRevenue, // Total calculado
            },
          };
        })
      );

      await transaction.commit();
      res.status(200).json(ordersWithTotals);
    } catch (error) {
      await transaction.rollback();
      console.error("Error fetching customer orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar un registro de consumo
  updateOrder: async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const transaction = await db.sequelize.transaction();
    try {
      const order = await db.Order.findByPk(id, { transaction });
      if (!order) {
        await transaction.rollback();
        return res.status(404).json({ error: "Order not found" });
      }

      await order.update({ quantity }, { transaction });
      await transaction.commit();

      res.status(200).json({
        message: "Order updated successfully",
        order,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Error updating order" });
    }
  },

  // Eliminar un registro de consumo
  deleteOrder: async (req, res) => {
    const { id } = req.params;

    const transaction = await db.sequelize.transaction();
    try {
      const order = await db.Order.findByPk(id, { transaction });
      if (!order) {
        await transaction.rollback();
        return res.status(404).json({ error: "Order not found" });
      }

      await order.destroy({ transaction });
      await transaction.commit();

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Error deleting order" });
    }
  },
};
