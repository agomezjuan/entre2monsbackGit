const { Customer } = require("../database/models");

module.exports = {
  //* GET */
  getCustomers: async (req, res) => {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      console.error("Error retrieving customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //* POST */
  createCustomer: async (req, res) => {
    const { firstName, surnames, email, telf } = req.body;
    if (!firstName || !surnames || !email) {
      return res.status(400).json({ error: "Missing arguments" });
    }
    try {
      const newCustomer = await Customer.create({
        firstName,
        surnames,
        email,
        telf,
      });
      res.status(201).json({
        message: "Customer created successfully",
        customer: newCustomer,
      });
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //* DELETE */
  deleteCustomer: async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      await customer.destroy();
      res.json({ message: `Customer with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
