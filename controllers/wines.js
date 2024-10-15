const {
  Wine,
  Cellar,
  Vintage,
  Stock,
  Price,
  Sulphite,
  WineType,
  Icon,
  Grape,
  Label,
  VintagesWinesStocks,
} = require("../database/models");

module.exports = {
  /*
   * GET - Obtener todos los vinos
   */
  getAllWines: async (req, res) => {
    try {
      const wines = await Wine.findAll({
        include: [
          {
            model: Cellar,
            attributes: ["cellar", "description", "distance"],
            as: "cellars",
          },
          {
            model: Vintage,
            as: "vintages",
            include: [
              {
                model: Stock,
                attributes: ["sku", "amountIn", "amountOut"],
                as: "stocks",
              },
              {
                model: Price,
                attributes: ["sellPrice", "costPrice", "date"],
                as: "prices",
              },
              {
                model: Grape,
                attributes: ["grape", "description"],
                as: "grapes",
              },
            ],
            through: { attributes: [] }, // Omitimos las columnas de la tabla intermedia
          },
          {
            model: Sulphite,
            attributes: ["sulphiteMin", "sulphiteMax"],
            as: "sulphites",
          },
          {
            model: WineType,
            attributes: ["wineType", "description"],
            as: "wineTypes",
          },
          {
            model: Icon,
            attributes: ["url", "description"],
            as: "icons",
          },
          {
            model: Grape,
            attributes: ["grape", "description"],
            as: "grapes",
          },
          {
            model: Label,
            attributes: ["name", "description"],
            as: "labels",
          },
        ],
      });

      // Verificar si se obtienen los resultados deseados
      if (!wines || wines.length === 0) {
        return res.status(404).json({ message: "No se encontraron vinos." });
      }

      res.json(wines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los vinos." });
    }
  },

  /*
   * GET - Obtener un vino por su ID
   */
  getWineById: async (req, res) => {
    try {
      const { id } = req.params;
      const wine = await Wine.findByPk(id, {
        include: [
          {
            model: Cellar,
            attributes: ["cellar", "description", "distance"],
            as: "cellars",
          },
          {
            model: Vintage,
            as: "vintages",
            through: { attributes: [] },
            include: [
              {
                model: Stock,
                attributes: ["sku", "amountIn", "amountOut"],
                as: "stocks",
              },
              {
                model: Price,
                attributes: ["sellPrice", "costPrice", "date"],
                as: "prices",
              },
            ],
          },
          {
            model: Sulphite,
            attributes: ["sulphiteMin", "sulphiteMax"],
            as: "sulphites",
          },
          {
            model: WineType,
            attributes: ["wineType", "description"],
            as: "wineTypes",
          },
          {
            model: Icon,
            attributes: ["url", "description"],
            as: "icons",
          },
          {
            model: Grape,
            attributes: ["grape", "description"],
            as: "grapes",
          },
          {
            model: Label,
            attributes: ["name", "description"],
            as: "labels",
          },
        ],
      });

      if (!wine) {
        return res.status(404).json({ message: "Vino no encontrado." });
      }

      res.json(wine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el vino." });
    }
  },

  /*
   * POST - Crear un nuevo vino
   */
  createWine: async (req, res) => {
    try {
      const {
        wine,
        description,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        sulphiteId,
        wineTypeId,
        vintages,
        icons,
        grapes,
        labels,
      } = req.body;

      if (
        !wine ||
        !production ||
        !vineyardAltitude ||
        !cellarId ||
        !vintages ||
        vintages.length === 0
      ) {
        return res.status(400).json({
          message:
            "Faltan campos obligatorios: wine, production, vineyardAltitude, cellarId, vintages.",
        });
      }

      // Recorrer las añadas para crear los registros asociados
      for (const vintageData of vintages) {
        const { vintageId, stockData, priceData } = vintageData;

        if (!vintageId || !stockData || !priceData) {
          return res.status(400).json({
            message:
              "Faltan campos obligatorios en la añada: vintageId, stockData, priceData.",
          });
        }

        // Crear el registro de Price antes que el Stock, para poder usar su priceId
        const newPrice = await Price.create(priceData);

        // Añadir priceId al stockData antes de crear Stock
        stockData.priceId = newPrice.id;

        // Crear el registro de Stock con el priceId
        const newStock = await Stock.create(stockData);

        // Finalmente, crear el vino utilizando el stockId asociado
        const createdWine = await Wine.create({
          wine,
          description,
          production,
          vineyardAltitude,
          img,
          tastingNotes,
          cellarId,
          sulphiteId,
          wineTypeId,
          stockId: newStock.id, // Asociar el stockId al vino
        });

        // Crear la relación en la tabla intermedia VintagesWinesStocks
        await VintagesWinesStocks.create({
          wineId: createdWine.id,
          vintageId,
          stockId: newStock.id,
          priceId: newPrice.id,
        });

        // Asignar iconos, uvas y etiquetas si existen
        if (icons && icons.length > 0) await createdWine.addIcons(icons);
        if (grapes && grapes.length > 0) await createdWine.addGrapes(grapes);
        if (labels && labels.length > 0) await createdWine.addLabels(labels);

        res.status(201).json({
          message: "Vino creado exitosamente",
          wine: createdWine,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el vino." });
    }
  },

  /*
   * PUT - Actualizar un vino por su ID
   */
  updateWine: async (req, res) => {
    const t = await sequelize.transaction(); // Iniciar transacción
    try {
      const { id } = req.params;
      const {
        wine,
        description,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        sulphiteId,
        wineTypeId,
        vintages,
        icons,
        grapes,
        labels,
      } = req.body;

      const existingWine = await Wine.findByPk(id, { transaction: t });
      if (!existingWine) {
        await t.rollback();
        return res.status(404).json({ message: "Vino no encontrado." });
      }

      // Actualizar datos del vino
      await existingWine.update(
        {
          wine,
          description,
          production,
          vineyardAltitude,
          img,
          tastingNotes,
          cellarId,
          sulphiteId,
          wineTypeId,
        },
        { transaction: t }
      );

      // Actualizar las añadas, stocks y precios
      for (const vintageData of vintages) {
        const { vintageId, stockData, priceData } = vintageData;

        const existingStock = await Stock.findOne({
          where: { sku: stockData.sku },
          transaction: t,
        });
        if (existingStock) {
          await existingStock.update(stockData, { transaction: t });
        } else {
          const newStock = await Stock.create(stockData, { transaction: t });
          await VintageWinesStocks.update(
            { stockId: newStock.id },
            { where: { wineId: id, vintageId }, transaction: t }
          );
        }

        const existingPrice = await Price.findOne({
          where: { id: priceData.id },
          transaction: t,
        });
        if (existingPrice) {
          await existingPrice.update(priceData, { transaction: t });
        } else {
          const newPrice = await Price.create(priceData, { transaction: t });
          await VintageWinesStocks.update(
            { priceId: newPrice.id },
            { where: { wineId: id, vintageId }, transaction: t }
          );
        }
      }

      // Actualizar iconos, uvas y etiquetas
      await existingWine.setIcons(icons, { transaction: t });
      await existingWine.setGrapes(grapes, { transaction: t });
      await existingWine.setLabels(labels, { transaction: t });

      await t.commit();
      res.json({
        message: `Vino con ID ${id} actualizado exitosamente`,
        wine: existingWine,
      });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el vino." });
    }
  },

  /*
   * DELETE - Eliminar un vino por su ID
   */
  deleteWine: async (req, res) => {
    const t = await sequelize.transaction(); // Iniciar transacción
    try {
      const { id } = req.params;

      const wine = await Wine.findByPk(id, { transaction: t });
      if (!wine) {
        await t.rollback();
        return res.status(404).json({ message: "Vino no encontrado." });
      }

      // Eliminar relaciones many-to-many
      await wine.setIcons([], { transaction: t });
      await wine.setGrapes([], { transaction: t });
      await wine.setLabels([], { transaction: t });

      await wine.destroy({ transaction: t });

      await t.commit();
      res.json({ message: `Vino con ID ${id} eliminado exitosamente` });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el vino." });
    }
  },
};
