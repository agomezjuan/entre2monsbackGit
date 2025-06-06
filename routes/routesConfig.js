const indexRouter = require("./index"); // Rutas de la página principal
const usersRouter = require("./users");
const regionsRoutes = require("./regionsRoutes");
const cellarsRouter = require("./cellars");
const soilsRouter = require("./soilsRoutes");
const countriesRouter = require("./countries");
const wineTypesRouter = require("./wineTypesRoutes");
const winesRouter = require("./winesControllers");
const grapesRouter = require("./grapes");
const iconsRouter = require("./iconsRoutes");
const stocksRouter = require("./stocksRoutes");
const pricesRouter = require("./prices");
const authRouter = require("./auth");
const suppliersRoutes = require("./suppliersRoutes");
const attributesRoutes = require("./attributesRoutes");
const vintageRouter = require("./vintagesRoutes");
const attributeCategoriesRouter = require("./attributeCategoriesRoutes");
const dosRoutes = require("./dosRoutes");
const suppliersAddressesRoutes = require("./suppliersAddressesRoutes");
const supplierRepresentativesRoutes = require("./supplierRepresentativesRoutes");
const daysRoute = require("./daysRoute");
const supplierDeliveryDetailsRoutes = require("./suppliersDeliveryDetailsRoutes");
const iconsCategoriesRoutes = require("./iconsCategoriesRoutes");
const iconsSubCategoriesRoutes = require("./iconsSubCategoriesRoutes");
const wasteRoutes = require("./wastesRoutes");
const customersRouter = require("./customersRoutes");
const ordersRouter = require("./ordersRoutes");
const ubicationsRoutes = require("./ubicationsRoutes");
const supplierPackRoutes = require("./supplierPack.routes");

const configureRoutes = (app) => {
  app.use("/", indexRouter); // Configurar la ruta principal
  app.use("/users", usersRouter);
  app.use("/regions", regionsRoutes);
  app.use("/cellars", cellarsRouter);
  app.use("/soils", soilsRouter);
  app.use("/countries", countriesRouter);
  app.use("/wine-types", wineTypesRouter);
  app.use("/wines", winesRouter);
  app.use("/grapes", grapesRouter);
  app.use("/icons", iconsRouter);
  app.use("/stocks", stocksRouter);
  app.use("/prices", pricesRouter);
  app.use("/auth", authRouter);
  app.use("/suppliers", suppliersRoutes);
  app.use("/attributes", attributesRoutes);
  app.use("/customers", customersRouter);
  app.use("/vintages", vintageRouter);
  app.use("/attributesCategories", attributeCategoriesRouter);
  app.use("/dos", dosRoutes);
  app.use("/suppliers-addresses", suppliersAddressesRoutes);
  app.use("/suppliers-representatives", supplierRepresentativesRoutes);
  app.use("/days", daysRoute);
  app.use("/supplier-delivery-details", supplierDeliveryDetailsRoutes);
  app.use("/icons-categories", iconsCategoriesRoutes);
  app.use("/icons-subcategories", iconsSubCategoriesRoutes);
  app.use("/wastes", wasteRoutes);
  app.use("/orders", ordersRouter);
  app.use("/ubications", ubicationsRoutes);
  app.use("/supplier-pack", supplierPackRoutes);
};

module.exports = configureRoutes;
