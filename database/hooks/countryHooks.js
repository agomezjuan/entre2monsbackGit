module.exports = {
  async afterCountryUpdate(country, options) {
    if (country.changed("active") && country.active === false) {
      const { Region, DO } = country.sequelize.models;

      // 👉 Buscar regiones asociadas
      const regions = await Region.findAll({
        where: { countryId: country.id },
        transaction: options.transaction,
      });

      for (const region of regions) {
        await region.update(
          { active: false },
          { transaction: options.transaction }
        );

        // 👉 Buscar DOs asociadas a cada región
        const dos = await region.getDenominations({
          transaction: options.transaction,
        });

        for (const doInstance of dos) {
          await doInstance.update(
            { active: false },
            { transaction: options.transaction }
          );
        }
      }
    }
  },
};
