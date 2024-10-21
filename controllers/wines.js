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
  WineVintage,
  Supplier,
  Region,
  Country,
  Soil,
  sequelize,
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
            as: "cellar", // Asociación con Cellar
            include: [
              {
                model: Region,
                as: "regions", // Usar el alias correcto 'regions'
                include: [
                  {
                    model: Country,
                    as: "countries", // Asociación directa con un país
                  },
                ],
              },
              {
                model: Soil,
                as: "soils", // Asociación directa con varios suelos
              },
              {
                model: Supplier,
                as: "suppliers", // Asociación directa con varios proveedores
              },
            ],
          },
          {
            model: Vintage,
            as: "vintages",
            through: { attributes: [] }, // Omitimos la tabla intermedia
            include: [
              {
                model: WineVintage,
                as: "wineVintageStocks", // Alias correcto en el modelo Vintage
                include: [
                  {
                    model: Stock,
                    as: "stock",
                    attributes: ["sku", "quantityIn", "quantityOut"],
                  },
                  {
                    model: Price,
                    as: "price",
                    attributes: ["salePrice", "purchasePrice"],
                  },
                ],
              },
            ],
          },
        ],
      });

      res.json(wines);
    } catch (error) {
      console.error("Error retrieving wines:", error);
      res.status(500).json({ error: "Error interno del servidor" });
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
            as: "cellar",
          },
          {
            model: Vintage,
            as: "vintages",
            through: { attributes: [] },
            include: [
              {
                model: Stock,
                attributes: ["sku", "quantityIn", "quantityOut"],
                as: "stocks",
              },
              {
                model: Price,
                attributes: ["sellPrice", "purchasePrice", "date"], // Atributos corregidos
                as: "prices",
              },
            ],
          },
          {
            model: Sulphite,
            attributes: ["sulphiteMin", "sulphiteMax"],
            as: "sulphite",
          },
          {
            model: WineType,
            attributes: ["wineType", "description"],
            as: "wineType",
          },
          {
            model: Icon,
            attributes: ["url", "description"],
            as: "icons",
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
   * POST - Crear un nuevo vino y asociarlo con vintages
   */
  createWine: async (req, res) => {
    const t = await sequelize.transaction(); // Iniciar transacción
    try {
      console.log("Datos recibidos en req.body:", req.body);

      const {
        name,
        description,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        sulphiteId,
        wineTypeId,
        vintages, // Array de vintages con su stock y price data
      } = req.body;

      if (!Array.isArray(vintages)) {
        await t.rollback();
        return res.status(400).json({ message: "Vintages debe ser un array." });
      }

      const createdWine = await Wine.create(
        {
          name,
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

      console.log("Vino creado con éxito:", createdWine);

      for (const vintageData of vintages) {
        const { vintageId, stockData, priceData } = vintageData;

        const vintage = await Vintage.findByPk(vintageId, { transaction: t });
        if (!vintage) {
          await t.rollback();
          return res.status(400).json({
            message: `El vintage con id ${vintageId} no existe.`,
          });
        }

        const wineVintage = await WineVintage.create(
          {
            wineId: createdWine.id,
            vintageId: vintage.id,
          },
          { transaction: t }
        );

        console.log("Asociación WineVintage creada:", wineVintage);

        if (
          stockData &&
          stockData.sku &&
          stockData.quantityIn != null &&
          stockData.quantityOut != null
        ) {
          await Stock.create(
            {
              ...stockData,
              wineVintageId: wineVintage.id,
            },
            { transaction: t }
          );
          console.log("Stock asociado con éxito:", stockData);
        } else if (stockData) {
          await t.rollback();
          return res.status(400).json({
            message:
              "Faltan los valores de 'quantityIn' o 'quantityOut' en stockData.",
          });
        }

        console.log("Datos de priceData recibidos:", priceData);

        if (
          priceData &&
          priceData.purchasePrice != null &&
          priceData.salePrice != null
        ) {
          try {
            await Price.create(
              {
                ...priceData,
                wineVintageId: wineVintage.id,
              },
              { transaction: t }
            );
            console.log("Precio asociado con éxito:", priceData);
          } catch (priceError) {
            console.error("Error al insertar precio:", priceError.message);
            await t.rollback();
            return res.status(500).json({ error: "Error al insertar precio." });
          }
        } else if (priceData) {
          await t.rollback();
          return res.status(400).json({
            message:
              "Faltan los valores de 'purchasePrice' o 'salePrice' en priceData.",
          });
        }
      }

      await t.commit();
      res.status(201).json({
        message: "Vino creado exitosamente y asociado a los vintages.",
        wine: createdWine,
      });
    } catch (error) {
      await t.rollback();
      console.error("Error al crear el vino:", error.message, error.stack);
      res
        .status(500)
        .json({ error: error.message || "Error interno del servidor." });
    }
  },

  /*
   * PUT - Actualizar un vino por su ID
   */
  updateWine: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const {
        name,
        description,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        sulphiteId,
        wineTypeId,
        vintages,
      } = req.body;

      const existingWine = await Wine.findByPk(id, { transaction: t });
      if (!existingWine) {
        await t.rollback();
        return res.status(404).json({ message: "Vino no encontrado." });
      }

      await existingWine.update(
        {
          name,
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
          await WineVintage.update(
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
          await WineVintage.update(
            { priceId: newPrice.id },
            { where: { wineId: id, vintageId }, transaction: t }
          );
        }
      }

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
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const wine = await Wine.findByPk(id, { transaction: t });
      if (!wine) {
        await t.rollback();
        return res.status(404).json({ message: "Vino no encontrado." });
      }

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
