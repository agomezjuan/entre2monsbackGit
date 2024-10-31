const {
  SupplierRepresentative,
  Supplier,
  sequelize,
} = require("../database/models");

module.exports = {
  // Crear un nuevo representante de proveedor
  createSupplierRepresentative: async (req, res) => {
    const { firstName, lastName, email, phone, supplierId } = req.body; // Asegúrate de recibir supplierId
    const transaction = await sequelize.transaction();

    try {
      const newRepresentative = await SupplierRepresentative.create(
        { firstName, lastName, email, phone, supplierId }, // Asigna supplierId aquí
        { transaction }
      );

      await transaction.commit();
      res.status(201).json(newRepresentative);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear el representante",
        error: error.message,
      });
    }
  },

  // Obtener todos los representantes de proveedores
  getAllSupplierRepresentatives: async (req, res) => {
    try {
      const representatives = await SupplierRepresentative.findAll({
        include: { model: Supplier, as: "supplier" },
      });
      res.status(200).json(representatives);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los representantes",
        error: error.message,
      });
    }
  },

  // Obtener un representante específico por ID
  getSupplierRepresentativeById: async (req, res) => {
    try {
      const representative = await SupplierRepresentative.findByPk(
        req.params.id,
        {
          include: { model: Supplier, as: "supplier" },
        }
      );
      if (representative) {
        res.status(200).json(representative);
      } else {
        res.status(404).json({ message: "Representante no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el representante",
        error: error.message,
      });
    }
  },

  // Actualizar un representante por ID
  updateSupplierRepresentative: async (req, res) => {
    const { firstName, lastName, email, phone, supplierId } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const representative = await SupplierRepresentative.findByPk(
        req.params.id,
        { transaction }
      );
      if (representative) {
        await representative.update(
          { firstName, lastName, email, phone, supplierId },
          { transaction }
        );
        await transaction.commit();
        res.status(200).json(representative);
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Representante no encontrado" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar el representante",
        error: error.message,
      });
    }
  },

  // Eliminar un representante por ID
  deleteSupplierRepresentative: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const representative = await SupplierRepresentative.findByPk(
        req.params.id,
        { transaction }
      );
      if (representative) {
        await representative.destroy({ transaction });
        await transaction.commit();
        res
          .status(200)
          .json({ message: "Representante eliminado correctamente" });
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Representante no encontrado" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar el representante",
        error: error.message,
      });
    }
  },
};
