const { Cellar, DO, Soil, Supplier, sequelize } = require("../database/models");

module.exports = {
  // Obtener todos los cellars con sus asociaciones
  getAllCellars: async (req, res) => {
    try {
      const cellars = await Cellar.findAll({
        include: [
          { model: DO, as: "denomination" },
          { model: Soil, as: "soils", through: { attributes: [] } },
          { model: Supplier, as: "suppliers", through: { attributes: [] } },
        ],
      });
      res.status(200).json(cellars);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las bodegas",
        error: error.message,
      });
    }
  },

  // Obtener un cellar por ID con sus asociaciones
  getCellarById: async (req, res) => {
    try {
      const cellar = await Cellar.findByPk(req.params.id, {
        include: [
          { model: DO, as: "denomination" },
          { model: Soil, as: "soils", through: { attributes: [] } },
          { model: Supplier, as: "suppliers", through: { attributes: [] } },
        ],
      });
      if (cellar) {
        res.status(200).json(cellar);
      } else {
        res.status(404).json({ message: "Bodega no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la bodega",
        error: error.message,
      });
    }
  },

  // Crear un nuevo cellar con asociaciones a DO, Soils y Suppliers
  createCellar: async (req, res) => {
    const {
      name,
      distance,
      description,
      awards,
      history,
      doId,
      soilIds,
      supplierIds,
    } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const newCellar = await Cellar.create(
        { name, distance, description, awards, history, doId },
        { transaction }
      );

      // Agregar suelos asociados
      if (soilIds) {
        const soils = await Soil.findAll({
          where: { id: soilIds },
          transaction,
        });
        await newCellar.addSoils(soils, { transaction });
      }

      // Agregar proveedores asociados
      if (supplierIds) {
        const suppliers = await Supplier.findAll({
          where: { id: supplierIds },
          transaction,
        });
        await newCellar.addSuppliers(suppliers, { transaction });
      }

      await transaction.commit();
      res.status(201).json(newCellar);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear la bodega",
        error: error.message,
      });
    }
  },

  // Actualizar un cellar por ID
  updateCellar: async (req, res) => {
    const {
      name,
      distance,
      description,
      awards,
      history,
      doId,
      soilIds,
      supplierIds,
    } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const cellar = await Cellar.findByPk(req.params.id, { transaction });
      if (!cellar) {
        await transaction.rollback();
        return res.status(404).json({ message: "Bodega no encontrada" });
      }

      await cellar.update(
        { name, distance, description, awards, history, doId },
        { transaction }
      );

      // Actualizar asociación de suelos
      if (soilIds) {
        const soils = await Soil.findAll({
          where: { id: soilIds },
          transaction,
        });
        await cellar.setSoils(soils, { transaction });
      }

      // Actualizar asociación de proveedores
      if (supplierIds) {
        const suppliers = await Supplier.findAll({
          where: { id: supplierIds },
          transaction,
        });
        await cellar.setSuppliers(suppliers, { transaction });
      }

      await transaction.commit();
      res.status(200).json(cellar);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar la bodega",
        error: error.message,
      });
    }
  },

  // Eliminar un cellar por ID
  deleteCellar: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const cellar = await Cellar.findByPk(req.params.id, { transaction });
      if (!cellar) {
        await transaction.rollback();
        return res.status(404).json({ message: "Bodega no encontrada" });
      }

      await cellar.destroy({ transaction });
      await transaction.commit();
      res.status(200).json({ message: "Bodega eliminada correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar la bodega",
        error: error.message,
      });
    }
  },
};
