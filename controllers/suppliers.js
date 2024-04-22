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
      brandName,
      country,
      city,
      adress,
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
        brandName,
        country,
        city,
        adress,
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
};
