const { Supplier } = require("../database/models");

module.exports = {
  // GET
  getSuppliers: async (req, res, next) => {
    try {
      const suppliers = await Supplier.findAll();
      console.log("All suppliers:", JSON.stringify(suppliers, null, 2));
      res.json(suppliers);
    } catch (error) {
      console.error("Error retrieving suppliers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createSupplier: async (req, res) => {
    const {
      companyName,
      fiscalName,
      NIF,
      country,
      city,
      address,
      CP,
      businessPhone,
      contactName,
      contactPhone,
      businessEmail,
      contactEmail,
      description,
    } = req.body;
    if (!companyName) {
      return res.status(400).json({ error: "Supplier is required" });
    }
    try {
      const newSupplier = await Supplier.create({
        companyName,
        fiscalName,
        NIF,
        country,
        city,
        address,
        CP,
        businessPhone,
        contactName,
        contactPhone,
        businessEmail,
        contactEmail,
        description,
      });
      res.status(201).json({
        message: "Supplier created successfully",
        supplier: newSupplier,
      });
    } catch (error) {
      console.error("Error creating supplier:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   * * Delete a supplier
   */
  deleteSupplier: async (req, res) => {
    const { id } = req.params;
    try {
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      await supplier.destroy();
      res.json({ message: `Supplier with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting supplier:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   * * Update supplier
   */
  updateSupplier: async (req, res) => {
    const { id } = req.params;
    const {
      companyName,
      fiscalName,
      NIF,
      country,
      city,
      address,
      CP,
      businessPhone,
      contactName,
      contactPhone,
      businessEmail,
      contactEmail,
      description,
    } = req.body;
    try {
      const supplierToUpdate = await Supplier.findByPk(id);
      if (!supplierToUpdate) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      await supplierToUpdate.update({
        companyName,
        fiscalName,
        NIF,
        country,
        city,
        address,
        CP,
        businessPhone,
        contactName,
        contactPhone,
        businessEmail,
        contactEmail,
        description,
      });
      res.json({
        message: `Supplier with ID: ${id} updated successfully`,
        supplier: supplierToUpdate,
      });
    } catch (error) {
      console.error("Error updating supplier:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
