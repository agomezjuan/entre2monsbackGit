module.exports = {
  async afterRegionUpdate(region, options) {
    if (region.changed("active") && region.active === false) {
      const { DO } = region.sequelize.models;

      // DOs asociadas a esta región (relación N:N)
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
  },
};
