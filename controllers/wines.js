const {
  Wine,
  Cellar,
  Region,
  Country,
  Supplier,
  Stock,
  Price,
  Sulphite,
  WineType,
  Icon,
  Grape,
  Label,
} = require("../database/models");

const wineController = {
  /*
   * GET - All wines
   */
  async getAllWines(req, res) {
    try {
      const wines = await Wine.findAll({
        include: [
          {
            model: Cellar,
            attributes: ["cellar", "description", "distance"],
            as: "cellars",
            include: [
              {
                model: Region,
                attributes: ["region", "description"],
                as: "regions",
                include: [
                  {
                    model: Country,
                    attributes: ["country", "description"],
                    as: "countries",
                  },
                ],
              },
              {
                model: Supplier,
                as: "suppliers",
                attributes: [
                  "companyName",
                  "fiscalName",
                  "NIF",
                  "country",
                  "city",
                  "adress",
                  "CP",
                  "businessPhone",
                  "contactName",
                  "contactPhone",
                  "businessEmail",
                  "contactEmail",
                  "description",
                ],
              },
            ],
          },
          {
            model: Stock,
            attributes: ["sku", "amountIn", "amountOut"],
            as: "stock",
          },
          {
            model: Price,
            attributes: ["priceRestaurant", "priceCost", "date"],
            as: "price",
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

      res.json(wines);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the wines" });
    }
  },

  /*
   * POST - Create a wine
   */
  async createWine(req, res) {
    try {
      const {
        wine,
        description,
        year,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        stockId,
        priceId,
        sulphiteId,
        wineTypeId,
        icons,
        grapes,
        labels,
      } = req.body;

      if (
        !wine ||
        !year ||
        !production ||
        !vineyardAltitude ||
        !cellarId ||
        !stockId ||
        !priceId ||
        !sulphiteId ||
        !wineTypeId ||
        !icons ||
        !grapes ||
        !labels
      ) {
        return res.status(400).json({
          message:
            "Wine, year, production, vineyardAltitude, cellarId, stockId and sulphiteId are required",
        });
      }

      const createdWine = await Wine.create({
        wine,
        description,
        year,
        production,
        vineyardAltitude,
        img,
        tastingNotes,
        cellarId,
        stockId,
        priceId,
        priceId,
        sulphiteId,
        wineTypeId,
        labels,
        grapes,
        icons,
      });

      icons.forEach(async (icon) => {
        await createdWine.addIcon(icon);
      });

      grapes.forEach(async (grape) => {
        await createdWine.addGrape(grape);
      });

      labels.forEach(async (label) => {
        await createdWine.addLabel(label);
      });

      res.status(201).json(createdWine);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the wine" });
    }
  },
};

module.exports = wineController;
