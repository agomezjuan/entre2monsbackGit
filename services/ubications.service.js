const models = require("../database/models");
const { Country, Region, DO, RegionsDOs, sequelize } = models;

const createUbicationPackService = async (payload) => {
  const t = await sequelize.transaction();
  try {
    const { country, region, do: doData } = payload;

    let countryInstance = null;
    let regionInstance = null;
    let doInstance = null;

    // === COUNTRY ===
    if (country?.name) {
      [countryInstance] = await Country.findOrCreate({
        where: { name: country.name.trim() },
        defaults: { description: country.description, code: country.code },
        transaction: t,
      });
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

      [doInstance] = await DO.findOrCreate({
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
    }

    await t.commit();

    return {
      message: "Ubicación creada correctamente.",
      created: {
        country: countryInstance
          ? { id: countryInstance.id, name: countryInstance.name }
          : null,
        region: regionInstance
          ? { id: regionInstance.id, name: regionInstance.name }
          : null,
        do: doInstance ? { id: doInstance.id, name: doInstance.name } : null,
      },
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

async function toggleUbicationStatusService(id, type) {
  const t = await sequelize.transaction();

  try {
    let model;
    if (type === "country") model = Country;
    else if (type === "region") model = Region;
    else if (type === "do") model = DO;
    else throw new Error("Tipo no válido");

    const item = await model.findByPk(id, { transaction: t });
    if (!item) throw new Error(`${type} con ID ${id} no encontrado`);

    const newState = !item.active;
    await item.update({ active: newState }, { transaction: t });

    // Cascade: desactivar hijos si se desactiva un padre
    if (type === "country" && newState === false) {
      const regions = await Region.findAll({
        where: { countryId: id },
        transaction: t,
      });
      for (const region of regions) {
        await region.update({ active: false }, { transaction: t });

        const dos = await region.getDenominations({ transaction: t });
        for (const d of dos) {
          await d.update({ active: false }, { transaction: t });
        }
      }
    }

    if (type === "region" && newState === false) {
      const dos = await item.getDenominations({ transaction: t });
      for (const d of dos) {
        await d.update({ active: false }, { transaction: t });
      }
    }

    await t.commit();
    return { id: item.id, active: newState, type };
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

module.exports = {
  createUbicationPackService,
  toggleUbicationStatusService,
};
