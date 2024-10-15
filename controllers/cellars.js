const { Cellar, Supplier, Soil, Region } = require("../database/models");

module.exports = {
  // GET all Cellars
  getAllCellars: async (req, res) => {
    try {
      const cellars = await Cellar.findAll({
        include: [
          {
            model: Supplier,
            as: "suppliers",
          },
          {
            model: Soil,
            as: "soils",
          },
          {
            model: Region,
            as: "regions",
          },
        ],
      });

      if (cellars.length === 0) {
        return res.status(404).json({ error: "No cellars found" });
      }
      res.json(cellars);
    } catch (error) {
      console.error("Error retrieving cellars:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET a single Cellar by ID
  getCellarById: async (req, res) => {
    try {
      const { id } = req.params;
      const cellar = await Cellar.findByPk(id, {
        include: [
          {
            model: Supplier,
            as: "suppliers",
          },
          {
            model: Soil,
            as: "soils",
          },
          {
            model: Region,
            as: "regions",
          },
        ],
      });
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }
      res.json(cellar);
    } catch (error) {
      console.error("Error retrieving cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST a new Cellar
  createCellar: async (req, res) => {
    try {
      const { cellar, description, distance, regionId, supplierIds, soilIds } =
        req.body;

      if (!cellar || !distance || !regionId) {
        return res
          .status(400)
          .json({ error: "Cellar name, distance, and regionId are required" });
      }

      // Create the new cellar
      const createdCellar = await Cellar.create({
        cellar,
        description,
        distance,
        regionId,
      });

      // Add Suppliers if provided
      if (supplierIds && Array.isArray(supplierIds)) {
        const suppliers = await Supplier.findAll({
          where: { id: supplierIds },
        });
        await createdCellar.addSuppliers(suppliers);
      }

      // Add Soils if provided
      if (soilIds && Array.isArray(soilIds)) {
        const soils = await Soil.findAll({
          where: { id: soilIds },
        });
        await createdCellar.addSoils(soils);
      }

      // Retrieve the created cellar with associations
      const cellarWithAssociations = await Cellar.findByPk(createdCellar.id, {
        include: [
          {
            model: Supplier,
            as: "suppliers",
          },
          {
            model: Soil,
            as: "soils",
          },
          {
            model: Region,
            as: "regions",
          },
        ],
      });

      res.status(201).json({
        message: "Cellar created successfully",
        cellar: cellarWithAssociations,
      });
    } catch (error) {
      console.error("Error creating cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE a Cellar by ID
  deleteCellar: async (req, res) => {
    try {
      const { id } = req.params;
      const cellar = await Cellar.findByPk(id, {
        include: [
          {
            model: Supplier,
            as: "suppliers",
          },
          {
            model: Soil,
            as: "soils",
          },
        ],
      });
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }

      // Remove associations with Suppliers and Soils before deleting
      await cellar.setSuppliers([]);
      await cellar.setSoils([]);

      await cellar.destroy();
      res.json({ message: `Cellar with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update a Cellar by ID
  updateCellar: async (req, res) => {
    try {
      const { id } = req.params;
      const { cellar, description, distance, regionId, supplierIds, soilIds } =
        req.body;

      const existingCellar = await Cellar.findByPk(id);
      if (!existingCellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }

      // Update the cellar details
      await existingCellar.update({
        cellar,
        description,
        distance,
        regionId,
      });

      // Update Suppliers if provided
      if (supplierIds && Array.isArray(supplierIds)) {
        const suppliers = await Supplier.findAll({
          where: { id: supplierIds },
        });
        await existingCellar.setSuppliers(suppliers);
      }

      // Update Soils if provided
      if (soilIds && Array.isArray(soilIds)) {
        const soils = await Soil.findAll({
          where: { id: soilIds },
        });
        await existingCellar.setSoils(soils);
      } else if (!soilIds || soilIds.length === 0) {
        // If soilIds is not provided or empty, clear the existing associations
        await existingCellar.setSoils([]);
      }

      // Retrieve the updated cellar with associations
      const updatedCellar = await Cellar.findByPk(id, {
        include: [
          {
            model: Supplier,
            as: "suppliers",
          },
          {
            model: Soil,
            as: "soils",
          },
          {
            model: Region,
            as: "regions",
          },
        ],
      });

      res.json({
        message: `Cellar with ID: ${id} updated successfully`,
        cellar: updatedCellar,
      });
    } catch (error) {
      console.error("Error updating cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
