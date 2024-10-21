const {
  Vintage,
  Wine,
  Stock,
  Price,
  WineVintage,
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
            as: "wines",
            through: { attributes: [] }, // Omite los atributos de la tabla intermedia
            include: [
              {
                model: WineVintage,
                as: "wineVintageStocks", // Debe coincidir con el alias en el modelo Vintage
                include: [
                  {
                    model: Stock,
                    as: "stock",
                    attributes: ["sku", "quantityIn", "quantityOut"],
                  },
                  {
                    model: Price,
                    as: "price",
                    attributes: ["salePrice", "purchasePrice"], // Eliminamos "date"
                  },
                ],
              },
            ],
          },
        ],
      });
      res.json(vintages);
    } catch (error) {
      console.error("Error retrieving vintages:", error);
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
            as: "wines",
            through: { attributes: [] }, // Omite los atributos de la tabla intermedia
            include: [
              {
                model: WineVintage,
                as: "wineVintageStocks", // Debe coincidir con el alias en el modelo Vintage
                include: [
                  {
                    model: Stock,
                    as: "stock",
                    attributes: ["sku", "quantityIn", "quantityOut"],
                  },
                  {
                    model: Price,
                    as: "price",
                    attributes: ["sellPrice", "purchasePrice"], // Eliminamos "date"
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!vintage) {
        return res.status(404).json({ message: "Vintage no encontrado." });
      }

      res.json(vintage);
    } catch (error) {
      console.error("Error retrieving vintage:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // ** POST a new Vintage
  createVintage: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { vintage, wineIds, stockIds, priceIds } = req.body;

      // Crear el registro de Vintage primero
      const createdVintage = await Vintage.create(
        { vintage },
        { transaction: t }
      );

      // Validar que los IDs de vinos, stocks y precios están presentes
      if (
        wineIds &&
        Array.isArray(wineIds) &&
        stockIds &&
        Array.isArray(stockIds) &&
        priceIds &&
        Array.isArray(priceIds)
      ) {
        for (let i = 0; i < wineIds.length; i++) {
          await WineVintage.create(
            {
              vintageId: createdVintage.id,
              wineId: wineIds[i],
              stockId: stockIds[i], // Suponiendo que el orden de los IDs coincide
              priceId: priceIds[i], // Suponiendo que el orden de los IDs coincide
            },
            { transaction: t }
          );
        }
      } else if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({
          where: { id: wineIds },
          transaction: t,
        });
        await createdVintage.addWines(wines, { transaction: t });
      }

      await t.commit();

      // Recuperar el Vintage con todas las asociaciones
      const vintageWithAssociations = await Vintage.findByPk(
        createdVintage.id,
        {
          include: [
            { model: Wine, as: "wines" },
            {
              model: Stock,
              as: "stock",
              through: { model: WineVintage },
            },
            {
              model: Price,
              as: "price",
              through: { model: WineVintage },
            },
          ],
        }
      );

      res.status(201).json({
        message: "Vintage creado y asociado correctamente",
        vintage: vintageWithAssociations,
      });
    } catch (error) {
      await t.rollback();
      console.error("Error al crear el vintage:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // ** DELETE a Vintage by ID
  deleteVintage: async (req, res) => {
    try {
      const { id } = req.params;

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

  // ** PUT update a Vintage by ID
  updateVintage: async (req, res) => {
    try {
      const { id } = req.params;
      const { vintage, wineIds, grapeIds } = req.body;

      const existingVintage = await Vintage.findByPk(id);
      if (!existingVintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      // Actualizar los detalles del vintage
      await existingVintage.update({ vintage });

      // Actualizar vinos
      if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({ where: { id: wineIds } });
        await existingVintage.setWines(wines);
      }

      // Actualizar uvas
      if (grapeIds && Array.isArray(grapeIds)) {
        const grapes = await Grape.findAll({ where: { id: grapeIds } });
        await existingVintage.setGrapes(grapes);
      } else if (!grapeIds || grapeIds.length === 0) {
        await existingVintage.setGrapes([]);
      }

      // Recuperar el vintage actualizado con sus asociaciones
      const updatedVintage = await Vintage.findByPk(id, {
        include: [
          { model: Wine, as: "wines" },
          { model: Grape, as: "grapes" },
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
