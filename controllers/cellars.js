const {
  Cellar,
  Supplier,
  Soil,
  Region,
  Country,
  sequelize,
} = require("../database/models");

module.exports = {
  // GET all Cellars
  getAllCellars: async (req, res) => {
    try {
      const cellars = await Cellar.findAll({
        include: [
          {
            model: Supplier,
            as: "suppliers", // Verifica que este alias coincida con el del modelo
          },
          {
            model: Soil,
            as: "soils", // Verifica que este alias coincida con el del modelo
          },
          {
            model: Region,
            as: "regions", // Verifica que este alias coincida con el del modelo
            include: [
              {
                model: Country,
                as: "countries", // Verifica que este alias coincida con el del modelo
              },
            ],
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
    const t = await sequelize.transaction(); // Iniciar una transacción de Sequelize
    try {
      const { cellar, description, distance, regionId, supplierIds, soilIds } =
        req.body;

      console.log("Datos recibidos en la solicitud:", req.body);

      // Validar campos requeridos
      if (!cellar || !distance || !regionId) {
        await t.rollback(); // Revertir la transacción en caso de error
        return res
          .status(400)
          .json({ error: "Cellar name, distance, and regionId are required" });
      }

      // Crear la bodega (Cellar)
      const createdCellar = await Cellar.create(
        {
          cellar,
          description,
          distance,
          regionId,
        },
        { transaction: t }
      ); // Pasar la transacción

      console.log("Cellar creado:", createdCellar.id);

      // Asociar Suppliers si se proporcionan
      if (supplierIds && Array.isArray(supplierIds)) {
        console.log("supplierIds recibidos:", supplierIds);

        const suppliers = await Supplier.findAll(
          {
            where: { id: supplierIds },
          },
          { transaction: t }
        );

        console.log("Proveedores encontrados:", suppliers.length);

        // Verificar si se encontraron proveedores válidos
        if (suppliers.length > 0) {
          await createdCellar.setSuppliers(suppliers, { transaction: t }); // Reemplazar `addSuppliers` por `setSuppliers`
          console.log("Proveedores asociados correctamente.");
        } else {
          console.log("No se encontraron proveedores válidos.");
          throw new Error("No valid suppliers found");
        }
      }

      // Asociar Soils si se proporcionan
      if (soilIds && Array.isArray(soilIds)) {
        console.log("soilIds recibidos:", soilIds);

        const soils = await Soil.findAll(
          {
            where: { id: soilIds },
          },
          { transaction: t }
        );

        console.log("Suelos encontrados:", soils.length);

        // Verificar si se encontraron suelos válidos
        if (soils.length > 0) {
          await createdCellar.setSoils(soils, { transaction: t }); // Reemplazar `addSoils` por `setSoils`
          console.log("Suelos asociados correctamente.");
        } else {
          console.log("No se encontraron suelos válidos.");
          throw new Error("No valid soils found");
        }
      }

      await t.commit(); // Confirmar la transacción

      console.log("Transacción confirmada.");

      // Retornar la bodega creada con sus asociaciones
      const cellarWithAssociations = await Cellar.findByPk(createdCellar.id, {
        include: [
          { model: Supplier, as: "suppliers" },
          { model: Soil, as: "soils" },
          { model: Region, as: "regions" },
        ],
      });

      res.status(201).json({
        message: "Cellar created successfully",
        cellar: cellarWithAssociations,
      });
    } catch (error) {
      await t.rollback(); // Revertir la transacción en caso de error
      console.error("Error creando el Cellar:", error);
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
