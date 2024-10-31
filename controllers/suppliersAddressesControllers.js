const { SupplierAddress, sequelize } = require("../database/models");

module.exports = {
  // Crear una nueva dirección de proveedor
  createSupplierAddress: async (req, res) => {
    const { street, city, postalCode, region_id, supplier_id } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const newAddress = await SupplierAddress.create(
        {
          street,
          city,
          postalCode,
          regionId: region_id, // Asegúrate de asignar `region_id` al campo `regionId`
          supplierId: supplier_id, // Asegúrate de asignar `supplier_id` al campo `supplierId`
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json(newAddress);
    } catch (error) {
      await transaction.rollback();
      res
        .status(500)
        .json({ message: "Error al crear la dirección", error: error.message });
    }
  },

  // Obtener todas las direcciones de proveedores
  getAllSupplierAddresses: async (req, res) => {
    try {
      const addresses = await SupplierAddress.findAll();
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las direcciones",
        error: error.message,
      });
    }
  },

  // Obtener una dirección de proveedor específica por ID
  getSupplierAddressById: async (req, res) => {
    try {
      const address = await SupplierAddress.findByPk(req.params.id);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ message: "Dirección no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la dirección",
        error: error.message,
      });
    }
  },

  // Actualizar una dirección de proveedor por ID
  updateSupplierAddress: async (req, res) => {
    const { street, city, postalCode, regionId, supplierId } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      const address = await SupplierAddress.findByPk(req.params.id);
      if (address) {
        // Actualizar dentro de la transacción
        await address.update(
          { street, city, postalCode, regionId, supplierId },
          { transaction }
        );

        // Confirmar la transacción si la actualización es exitosa
        await transaction.commit();
        res.status(200).json(address);
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Dirección no encontrada" });
      }
    } catch (error) {
      // Deshacer la transacción en caso de error
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar la dirección",
        error: error.message,
      });
    }
  },

  // Eliminar una dirección de proveedor por ID
  deleteSupplierAddress: async (req, res) => {
    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      const address = await SupplierAddress.findByPk(req.params.id);
      if (address) {
        // Eliminar dentro de la transacción
        await address.destroy({ transaction });

        // Confirmar la transacción si la eliminación es exitosa
        await transaction.commit();
        res.status(200).json({ message: "Dirección eliminada correctamente" });
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Dirección no encontrada" });
      }
    } catch (error) {
      // Deshacer la transacción en caso de error
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar la dirección",
        error: error.message,
      });
    }
  },
};
