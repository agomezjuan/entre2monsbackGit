const {
  Vintage,
  Wine,
  Grape,
  Stock,
  Price,
  VintagesWinesStocks,
  sequelize,
} = require("../database/models");

module.exports = {
  // ** GET all Vintages
  getAllVintages: async (req, res) => {
    try {
      const vintages = await Vintage.findAll({
        include: [
          {
            model: Wine,
            as: "wines", // Incluir los vinos asociados a cada vintage
          },
        ],
      });
      res.json(vintages);
    } catch (error) {
      console.error("Error retrieving vintages:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // GET a single Vintage by ID with associated Wines
  getVintageById: async (req, res) => {
    try {
      const { id } = req.params;
      const vintage = await Vintage.findByPk(id, {
        include: [
          {
            model: Wine,
            as: "wines", // Incluir los vinos asociados a este vintage
          },
        ],
      });
      if (!vintage) {
        return res.status(404).json({ error: "Vintage no encontrado" });
      }
      res.json(vintage);
    } catch (error) {
      console.error("Error retrieving vintage:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // ** GET a single Vintage by ID
  getVintageById: async (req, res) => {
    try {
      const { id } = req.params;
      const vintage = await Vintage.findByPk(id, {
        include: [
          {
            model: Wine,
            as: "wines", // Incluir los vinos asociados
            through: { attributes: [] }, // Omitimos la tabla intermedia en los resultados
            include: [
              {
                model: Stock,
                as: "stocks", // Incluir stock asociado al vino
                attributes: ["sku", "amountIn", "amountOut"],
              },
              {
                model: Price,
                as: "prices", // Incluir precio asociado al vino
                attributes: ["sellPrice", "costPrice", "date"],
              },
            ],
          },
        ],
      });

      if (!vintage) {
        return res.status(404).json({ message: "Vintage no encontrado." });
      }

      res.json(vintage); // Devolver el vintage con los vinos asociados
    } catch (error) {
      console.error("Error retrieving vintage:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // ** POST a new Vintage
  createVintage: async (req, res) => {
    try {
      const { vintage, wineIds, stockIds, priceIds } = req.body;

      // Crear el registro de Vintage primero
      const createdVintage = await Vintage.create({ vintage });

      // Validar que los IDs de vinos, stocks y precios están presentes
      if (
        wineIds &&
        Array.isArray(wineIds) &&
        stockIds &&
        Array.isArray(stockIds) &&
        priceIds &&
        Array.isArray(priceIds)
      ) {
        // Iterar sobre los IDs de vinos y asociarlos con stocks y prices
        for (let i = 0; i < wineIds.length; i++) {
          await VintagesWinesStocks.create({
            vintageId: createdVintage.id,
            wineId: wineIds[i],
            stockId: stockIds[i], // Suponiendo que el orden de los IDs coincide
            priceId: priceIds[i], // Suponiendo que el orden de los IDs coincide
          });
        }
      } else {
        // Si no hay stocks o precios, solo asociar los vinos
        if (wineIds && Array.isArray(wineIds)) {
          const wines = await Wine.findAll({ where: { id: wineIds } });
          await createdVintage.addWines(wines);
        }
      }

      // Recuperar el Vintage con todas las asociaciones
      const vintageWithAssociations = await Vintage.findByPk(
        createdVintage.id,
        {
          include: [
            { model: Wine, as: "wines" },
            {
              model: Stock,
              as: "stocks",
              through: { model: VintagesWinesStocks },
            },
            {
              model: Price,
              as: "prices",
              through: { model: VintagesWinesStocks },
            },
          ],
        }
      );

      res.status(201).json({
        message: "Vintage creado y asociado correctamente",
        vintage: vintageWithAssociations,
      });
    } catch (error) {
      console.error("Error al crear el vintage:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // DELETE a Vintage by ID
  deleteVintage: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar el vintage por ID, incluyendo asociaciones con wines y grapes
      const vintage = await Vintage.findByPk(id, {
        include: [
          { model: Wine, as: "wines" },
          { model: Grape, as: "grapes" },
        ],
      });

      if (!vintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      // Eliminar asociaciones con Wines y Grapes
      await vintage.setWines([]);
      await vintage.setGrapes([]);

      // Eliminar el vintage
      await vintage.destroy();
      res.json({ message: `Vintage with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update a Vintage by ID
  updateVintage: async (req, res) => {
    try {
      const { id } = req.params;
      const { vintage, wineIds, grapeIds } = req.body;

      const existingVintage = await Vintage.findByPk(id);
      if (!existingVintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      // Update the vintage details
      await existingVintage.update({
        vintage,
      });

      // Update Wines if provided
      if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({
          where: { id: wineIds },
        });
        await existingVintage.setWines(wines);
      }

      // Update Grapes if provided
      if (grapeIds && Array.isArray(grapeIds)) {
        const grapes = await Grape.findAll({
          where: { id: grapeIds },
        });
        await existingVintage.setGrapes(grapes);
      } else if (!grapeIds || grapeIds.length === 0) {
        // If grapeIds is not provided or empty, clear the existing associations
        await existingVintage.setGrapes([]);
      }

      // Retrieve the updated vintage with associations
      const updatedVintage = await Vintage.findByPk(id, {
        include: [
          {
            model: Wine,
            as: "wines",
          },
          {
            model: Grape,
            as: "grapes",
          },
        ],
      });

      res.json({
        message: `Vintage with ID: ${id} updated successfully`,
        vintage: updatedVintage,
      });
    } catch (error) {
      console.error("Error updating vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
