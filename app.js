const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const regionsRoutes = require("./routes/regionsRoutes");
const cellarsRouter = require("./routes/cellars");
const soilsRouter = require("./routes/soilsRoutes");
const countriesRouter = require("./routes/countries");
const wineTypesRouter = require("./routes/wineTypesRoutes");
const winesRouter = require("./routes/winesControllers");
const grapesRouter = require("./routes/grapes");
const iconsRouter = require("./routes/iconsRoutes");
const stocksRouter = require("./routes/stocks");
const pricesRouter = require("./routes/prices");
const sulphitesRouter = require("./routes/sulphites");
const authRouter = require("./routes/auth");
const suppliersRoutes = require("./routes/suppliersRoutes");
const attributesRoutes = require("./routes/attributesRoutes");
const customersRouter = require("./routes/customers");
const vintageRouter = require("./routes/vintagesRoutes");
const attributeCategoriesRouter = require("./routes/attributeCategoriesRoutes");
const dosRoutes = require("./routes/dosRoutes");
const suppliersAddressesRoutes = require("./routes/suppliersAddressesRoutes");
const supplierRepresentativesRoutes = require("./routes/supplierRepresentativesRoutes");
const daysRoute = require("./routes/daysRoute");
const supplierDeliveryDetailsRoutes = require("./routes/suppliersDeliveryDetailsRoutes");
const iconsCategoriesRoutes = require("./routes/iconsCategoriesRoutes");
const iconsSubCategoriesRoutes = require("./routes/iconsSubCategoriesRoutes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
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
app.use("/sulphites", sulphitesRouter);
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
