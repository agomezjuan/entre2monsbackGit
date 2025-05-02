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

const toggleUbicationStatusService = async (id) => {
  const t = await sequelize.transaction();

  try {
    let entity = await Country.findByPk(id, { transaction: t });
    let type = "country";

    if (!entity) {
      entity = await Region.findByPk(id, { transaction: t });
      type = "region";
    }

    if (!entity) {
      entity = await DO.findByPk(id, { transaction: t });
      type = "do";
    }

    if (!entity) throw new Error("Ubicación no encontrada.");

    // Cambia el estado
    const newStatus = !entity.active;
    entity.active = newStatus;

    await entity.save({ transaction: t });

    // 👇 Aquí se ejecutarán tus hooks afterUpdate si están en el modelo
    await entity.reload({ transaction: t });

    await t.commit();

    return {
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
        newStatus ? "activado" : "desactivado"
      } correctamente.`,
      updated: {
        id: entity.id,
        name: entity.name,
        active: entity.active,
        type,
      },
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  createUbicationPackService,
  toggleUbicationStatusService,
};
