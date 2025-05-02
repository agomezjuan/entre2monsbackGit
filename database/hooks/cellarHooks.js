module.exports = {
  async afterCellarUpdate(cellar, options) {
    if (cellar.changed("active") && cellar.active === false) {
      const { CellarsSuppliers, CellarsSoils, Stock, Waste, Wine } =
        cellar.sequelize.models;

      // ❌ Desactivar relaciones con suppliers
      await CellarsSuppliers.update(
        { active: false },
        {
          where: { cellar_id: cellar.id },
          transaction: options.transaction,
        }
      );

      // ❌ Desactivar relaciones con soils
      await CellarsSoils.update(
        { active: false },
        {
          where: { cellar_id: cellar.id },
          transaction: options.transaction,
        }
      );

      // ❌ Desactivar stocks
      await Stock.update(
        { active: false },
        {
          where: { cellarId: cellar.id },
          transaction: options.transaction,
        }
      );

      // ❌ Desactivar wastes
      await Waste.update(
        { active: false },
        {
          where: { cellarId: cellar.id },
          transaction: options.transaction,
        }
      );

      // ❌ Desactivar vinos de esa bodega
      await Wine.update(
        { active: false },
        {
          where: { cellarId: cellar.id },
          transaction: options.transaction,
        }
      );
    }
  },
};
