const { Cellar, Supplier, Soil, Region } = require("../database/models");

module.exports = {
  // GET
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
            as: "region",
          },
        ],
      });

      console.log("All cellars:", JSON.stringify(cellars, null, 2));
      res.json(cellars);
    } catch (error) {
      console.error("Error retrieving cellars:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCellarById: async (req, res) => {
    try {
      const { id } = req.params;
      const cellar = await Cellar.findByPk(id);
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }
      res.json(cellar);
    } catch (error) {
      console.error("Error retrieving cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST
  createCellar: async (req, res) => {
    try {
      const { cellar, description, distance, regionId, supplierId, soilId } =
        req.body;
      console.log(req.body);

      if (!cellar) {
        // Verificación también actualizada para snake_case
        return res.status(400).json({ error: "Cellar name is required" });
      }

      const createdCellar = await Cellar.create({
        cellar,
        description,
        distance,
        regionId,
        supplierId,
      });

      /**
       * * Para agregar relaciones muchos a muchos en una tabla intermedia, se debe hacer de la siguiente manera:
       */
      const suppliers = await Supplier.findAll({
        where: { id: supplierId },
      });
      supplierId.forEach(async (supplierId) => {
        const supplier = await Supplier.findByPk(supplierId);
        await createdCellar.addSupplier(supplier);
      });

      soilId.forEach(async (soilId) => {
        const soils = await Soil.findByPk(soilId);
        await createdCellar.addSoil(soils);
      });

      console.log("created cellar", createdCellar);
      res.status(201).json({
        message: "Cellar created successfully",
        cellar: createdCellar,
      });
    } catch (error) {
      console.error("Error creating cellar:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Cellar name must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteCellar: async (req, res) => {
    try {
      const { id } = req.params;
      const cellar = await Cellar.findByPk(id);
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }

      await cellar.destroy();
      console.log(`Deleted cellar with ID: ${id}`);
      res.json({ message: `Cellar with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT
  updateCellar: async (req, res) => {
    try {
      const { id } = req.params;
      const { cellar_name, description } = req.body; // Actualizado para usar snake_case

      const cellar = await Cellar.findByPk(id);
      if (!cellar) {
        return res.status(404).json({ error: "Cellar not found" });
      }

      await cellar.update({
        cellar_name, // Usando snake_case para coincidir con la definición del modelo
        description,
      });

      console.log(`Updated cellar with ID: ${id}`);
      res.json({
        message: `Cellar with ID: ${id} updated successfully`,
        cellar,
      });
    } catch (error) {
      console.error("Error updating cellar:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
