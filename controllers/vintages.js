const {
  Vintage,
  Wine,
  Grape,
  Stock,
  Price,
  sequelize,
} = require("../database/models");

module.exports = {
  // GET all Vintages
  getAllVintages: async (req, res) => {
    try {
      const vintages = await Vintage.findAll({
        include: [
          {
            model: Grape,
            attributes: ["grape", "description"],
            as: "grapes",
          },
        ],
      });
      res.json(vintages);
    } catch (error) {
      console.error("Error retrieving vintages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET a single Vintage by ID
  getVintageById: async (req, res) => {
    try {
      const { id } = req.params;
      const vintage = await Vintage.findByPk(id, {
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
      if (!vintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }
      res.json(vintage);
    } catch (error) {
      console.error("Error retrieving vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST a new Vintage
  createVintage: async (req, res) => {
    try {
      const { vintage, wineIds, stockIds, priceIds } = req.body;

      // Crear el registro de Vintage primero
      const createdVintage = await Vintage.create({ vintage });

      // Asegurarse de que los vinos se crean antes de hacer las asociaciones
      if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({ where: { id: wineIds } });

        // Si hay stocks y precios, asociarlos a través de la tabla VintageWineStocks
        if (
          wines.length &&
          stockIds &&
          Array.isArray(stockIds) &&
          priceIds &&
          Array.isArray(priceIds)
        ) {
          for (let i = 0; i < wines.length; i++) {
            // Asociar cada vino con el vintage, stock y price correspondiente
            await VintagesWinesStocks.create({
              vintageId: createdVintage.id,
              wineId: wines[i].id,
              stockId: stockIds[i], // Suponiendo que los IDs de stock se pasan en el mismo orden
              priceId: priceIds[i], // Suponiendo que los IDs de price se pasan en el mismo orden
            });
          }
        } else {
          // En caso de que no se tengan stocks o precios, sólo se relaciona el vino
          await createdVintage.addWines(wines);
        }
      }

      // Recuperar el vintage con las asociaciones
      const vintageWithAssociations = await Vintage.findByPk(
        createdVintage.id,
        {
          include: [
            { model: Wine, as: "wines" },
            { model: Stock, as: "stocks" },
            { model: Price, as: "prices" },
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
