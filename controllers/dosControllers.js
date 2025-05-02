const { DO, Region, sequelize } = require("../database/models");

module.exports = {
  // Obtener todas las denominaciones de origen (DO) con regiones y stocks asociados
  getAllDOs: async (req, res) => {
    try {
      const dos = await DO.findAll({
        include: [
          {
            model: Region,
            as: "regions",
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(dos);
    } catch (error) {
      console.error("Error al obtener las DOs:", error);
      res.status(500).json({ message: "Error al obtener las DOs", error });
    }
  },

  getRegionRelations: async (req, res) => {
    try {
      const { id } = req.params;

      const region = await Region.findByPk(id, {
        include: [
          {
            model: DO,
            as: "denominations",
          },
        ],
      });

      if (!region) {
        return res.status(404).json({ message: "Región no encontrada" });
      }

      const doCount = region.denominations?.length || 0;

      res.status(200).json({
        regionId: region.id,
        relations: {
          denominations: doCount,
        },
      });
    } catch (error) {
      console.error("❌ Error en getRegionRelations:", error);
      res.status(500).json({
        message: "Error al obtener relaciones de la región",
        error: error.message,
      });
    }
  },

  // Obtener una DO por ID
  getDOById: async (req, res) => {
    const { id } = req.params;
    try {
      const doItem = await DO.findByPk(id, {
        include: [
          {
            model: Region,
            as: "regions",
            attributes: ["name", "description"],
            through: { attributes: [] },
          },
        ],
      });
      if (!doItem) {
        return res.status(404).json({ message: "DO no encontrada" });
      }
      res.status(200).json(doItem);
    } catch (error) {
      console.error("Error al obtener la DO:", error);
      res.status(500).json({ message: "Error al obtener la DO", error });
    }
  },

  // Crear una nueva DO
  createDO: async (req, res) => {
    const { name, description, region_ids } = req.body;
    const transaction = await sequelize.transaction();

    try {
      // Validar que el campo region_ids existe y es un array no vacío
      if (!Array.isArray(region_ids) || region_ids.length === 0) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Se debe proporcionar al menos un ID de región en 'region_ids'.",
        });
      }

      // Crear el registro de DO
      const newDO = await DO.create(
        {
          name,
          description,
        },
        { transaction }
      );

      // Verificar que las regiones existan
      const existingRegions = await Region.findAll({
        where: { id: region_ids },
        transaction,
      });

      if (existingRegions.length !== region_ids.length) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Una o más regiones no fueron encontradas" });
      }

      // Añadir las relaciones en `regions_dos` automáticamente
      await newDO.addRegions(existingRegions, { transaction });

      await transaction.commit();
      res.status(201).json({ message: "DO creada con éxito", data: newDO });
    } catch (error) {
      await transaction.rollback();
      console.error("Error al crear la DO con regiones:", error);
      res
        .status(500)
        .json({ message: "Error al crear la DO con regiones", error });
    }
  },

  // Actualizar una DO existente
  updateDO: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const doItem = await DO.findByPk(id, { transaction });
      if (!doItem) {
        await transaction.rollback();
        return res.status(404).json({ message: "DO no encontrada" });
      }

      doItem.name = name || doItem.name;
      doItem.description = description || doItem.description;
      await doItem.save({ transaction });

      const updatedDO = await DO.findByPk(doItem.id, {
        include: [
          {
            model: Region,
            as: "regions",
            attributes: ["name", "description"],
          },
        ],
      });

      await transaction.commit();
      res.status(200).json(updatedDO);
    } catch (error) {
      await transaction.rollback();
      console.error("Error al actualizar la DO:", error);
      res.status(500).json({ message: "Error al actualizar la DO", error });
    }
  },

  // Eliminar una DO
  deleteDO: async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const doItem = await DO.findByPk(id, { transaction });
      if (!doItem) {
        await transaction.rollback();
        return res.status(404).json({ message: "DO no encontrada" });
      }

      await doItem.destroy({ transaction });
      await transaction.commit();
      res.status(200).json({ message: "DO eliminada correctamente" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error al eliminar la DO:", error);
      res.status(500).json({ message: "Error al eliminar la DO", error });
    }
  },
};
