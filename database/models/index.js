const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../../config/config.js"))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Leer los modelos del directorio actual e importarlos en `db`
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const filePath = path.join(__dirname, file);
    console.log(`📦 Cargando modelo: ${file}`); // 👈 DEBUG VISUAL

    const modelFactory = require(filePath);

    if (typeof modelFactory !== "function") {
      console.error(
        `❌ El archivo ${file} no exporta una función. Revisa su estructura.`
      );
      return;
    }

    const model = modelFactory(sequelize, Sequelize.DataTypes);

    if (model.name === "DO") {
      db.DO = model;
    } else {
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
