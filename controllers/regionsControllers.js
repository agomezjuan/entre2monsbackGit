const { Region, Country, sequelize } = require("../database/models");

module.exports = {
  // Obtener todas las regiones con el país asociado
  getAllRegions: async (req, res) => {
    try {
      const regions = await Region.findAll({
        include: [
          {
            model: Country,
            as: "country",
            attributes: ["id", "name"],
          },
        ],
      });
      res.status(200).json(regions);
    } catch (error) {
      console.error("Error retrieving regions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Crear una nueva región y devolverla con país incluido
  createRegion: async (req, res) => {
    const { name, countryId, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const newRegion = await Region.create(
        { name, countryId, description },
        { transaction }
      );
      await transaction.commit();

      // Recargar región con país asociado
      const createdRegion = await Region.findOne({
        where: { id: newRegion.id },
        include: { model: Country, as: "country" }, // Verificar alias
      });
      res.status(201).json(createdRegion);
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Actualizar una región y devolverla con país incluido
  updateRegion: async (req, res) => {
    const { id } = req.params;
    const { name, countryId, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const regionToUpdate = await Region.findByPk(id, { transaction });
      if (!regionToUpdate) {
        await transaction.rollback();
        return res.status(404).json({ error: "Region not found" });
      }

      await regionToUpdate.update(
        { name, countryId, description },
        { transaction }
      );
      await transaction.commit();

      // Recargar región actualizada con país asociado
      const updatedRegion = await Region.findOne({
        where: { id: regionToUpdate.id },
        include: { model: Country, as: "country" }, // Verificar alias
      });
      res.status(200).json(updatedRegion);
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Eliminar una región
  deleteRegion: async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const regionToDelete = await Region.findByPk(id, { transaction });
      if (!regionToDelete) {
        await transaction.rollback();
        return res.status(404).json({ error: "Region not found" });
      }
      await regionToDelete.destroy({ transaction });
      await transaction.commit();
      res
        .status(200)
        .json({ message: `Region with ID: ${id} deleted successfully` });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting region:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
