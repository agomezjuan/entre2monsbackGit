const models = require("../database/models");
const { Country, Region, DO, RegionsDOs, sequelize } = models;

const createUbicationPackService = async (payload) => {
  const t = await sequelize.transaction();
  try {
    const { country, region, do: doData } = payload;

    const result = {
      country: null,
      region: null,
      do: null,
    };

    let countryInstance = null;
    let regionInstance = null;

    // === COUNTRY ===
    if (country?.name) {
      [countryInstance] = await Country.findOrCreate({
        where: { name: country.name.trim() },
        defaults: { description: country.description },
        transaction: t,
      });
      result.country = countryInstance.name;
    }

    // === REGION ===
    if (region?.name) {
      const countryId = countryInstance?.id || region.countryId;

      if (!countryId) {
        throw new Error("Para crear una región necesitas un país asociado.");
      }

      [regionInstance] = await Region.findOrCreate({
        where: { name: region.name.trim() },
        defaults: {
          description: region.description,
          countryId,
        },
        transaction: t,
      });

      result.region = regionInstance.name;
    }

    // === DO ===
    if (doData?.name) {
      const regionIds = doData.regionIds?.length
        ? doData.regionIds
        : regionInstance
        ? [regionInstance.id]
        : [];

      if (!regionIds.length) {
        throw new Error(
          "Para crear una DO necesitas al menos una región válida."
        );
      }

      const [doInstance] = await DO.findOrCreate({
        where: { name: doData.name.trim() },
        defaults: { description: doData.description },
        transaction: t,
      });

      for (const regionId of regionIds) {
        await RegionsDOs.findOrCreate({
          where: {
            region_id: regionId,
            do_id: doInstance.id,
          },
          transaction: t,
        });
      }

      result.do = doInstance.name;
    }

    await t.commit();
    return {
      message: "Ubicación creada correctamente.",
      created: result,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { createUbicationPackService };
