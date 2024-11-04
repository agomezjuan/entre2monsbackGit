const db = require("../database/models");

module.exports = {
  // Obtener todos los clientes
  getAllCustomers: async (req, res) => {
    try {
      const customers = await db.Customer.findAll();
      res.status(200).json(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Obtener un cliente por ID
  getCustomerById: async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await db.Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Crear un nuevo cliente
  createCustomer: async (req, res) => {
    const { name, surnames, email, phone, notes } = req.body;

    // Validación de campos
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const transaction = await db.sequelize.transaction();
    try {
      const newCustomer = await db.Customer.create(
        {
          name,
          surnames,
          email,
          phone,
          notes,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({
        message: "Customer created successfully",
        customer: newCustomer,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Error creating customer" });
    }
  },

  // Actualizar un cliente
  updateCustomer: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, notes } = req.body;

    const transaction = await db.sequelize.transaction();
    try {
      const customer = await db.Customer.findByPk(id, { transaction });
      if (!customer) {
        await transaction.rollback();
        return res.status(404).json({ error: "Customer not found" });
      }

      await customer.update({ name, email, phone, notes }, { transaction });

      await transaction.commit();
      res.status(200).json({
        message: "Customer updated successfully",
        customer,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Error updating customer" });
    }
  },

  // Eliminar un cliente
  deleteCustomer: async (req, res) => {
    const { id } = req.params;

    const transaction = await db.sequelize.transaction();
    try {
      const customer = await db.Customer.findByPk(id, { transaction });
      if (!customer) {
        await transaction.rollback();
        return res.status(404).json({ error: "Customer not found" });
      }

      await customer.destroy({ transaction });
      await transaction.commit();

      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Error deleting customer" });
    }
  },

  // Obtener todas las ventas de un cliente (muchos a muchos con Order)
  getCustomerSales: async (req, res) => {
    const { id } = req.params;

    try {
      const customer = await db.Customer.findByPk(id, {
        include: {
          model: db.Sale,
          as: "sales",
        },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.status(200).json(customer);
    } catch (error) {
      console.error("Error fetching customer sales:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
