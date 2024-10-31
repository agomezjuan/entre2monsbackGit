const {
  SupplierDeliveryDetail,
  Supplier,
  Day,
  sequelize,
} = require("../database/models");

module.exports = {
  // Obtener todos los SupplierDeliveryDetails con días de reparto y proveedor asociado
  getAllSupplierDeliveryDetails: async (req, res) => {
    try {
      const deliveryDetails = await SupplierDeliveryDetail.findAll({
        include: [
          {
            model: Day,
            as: "days",
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
          {
            model: Supplier,
            as: "supplier",
          },
        ],
      });
      res.status(200).json(deliveryDetails);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los detalles de entrega",
        error: error.message,
      });
    }
  },

  // Obtener un SupplierDeliveryDetail por ID con días de reparto y proveedor asociado
  getSupplierDeliveryDetailById: async (req, res) => {
    try {
      const deliveryDetail = await SupplierDeliveryDetail.findByPk(
        req.params.id,
        {
          include: [
            { model: Supplier, as: "supplier" },
            { model: Day, as: "days", through: { attributes: [] } },
          ],
        }
      );
      if (deliveryDetail) {
        res.status(200).json(deliveryDetail);
      } else {
        res.status(404).json({ message: "Detalle de entrega no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el detalle de entrega",
        error: error.message,
      });
    }
  },

  // Crear un nuevo SupplierDeliveryDetail con días asociados
  createSupplierDeliveryDetail: async (req, res) => {
    const { minPurchase, deliveryTax, supplierId, dayIds } = req.body;
    const transaction = await sequelize.transaction();

    try {
      // Crear el detalle de entrega
      const newDeliveryDetail = await SupplierDeliveryDetail.create(
        { minPurchase, deliveryTax, supplierId },
        { transaction }
      );

      // Verificar que los días existen
      const days = await Day.findAll({ where: { id: dayIds }, transaction });
      if (days.length !== dayIds.length) {
        await transaction.rollback();
        return res.status(400).json({
          message: "Algunos IDs de días no existen",
        });
      }

      // Asociar los días al nuevo detalle de entrega
      await newDeliveryDetail.setDays(days, { transaction });

      await transaction.commit();
      res.status(201).json(newDeliveryDetail);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al crear el detalle de entrega",
        error: error.message,
      });
    }
  },

  // Actualizar un SupplierDeliveryDetail por ID con días asociados
  updateSupplierDeliveryDetail: async (req, res) => {
    const { minPurchase, deliveryTax, supplierId, dayIds } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const deliveryDetail = await SupplierDeliveryDetail.findByPk(
        req.params.id,
        { transaction }
      );
      if (!deliveryDetail) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Detalle de entrega no encontrado" });
      }

      // Verificar que los días existen
      const days = await Day.findAll({ where: { id: dayIds }, transaction });
      if (days.length !== dayIds.length) {
        await transaction.rollback();
        return res.status(400).json({
          message: "Algunos IDs de días no existen",
        });
      }

      await deliveryDetail.update(
        { minPurchase, deliveryTax, supplierId },
        { transaction }
      );

      // Actualizar asociación de días
      await deliveryDetail.setDays(days, { transaction });

      await transaction.commit();
      res.status(200).json(deliveryDetail);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al actualizar el detalle de entrega",
        error: error.message,
      });
    }
  },

  // Eliminar un SupplierDeliveryDetail por ID
  deleteSupplierDeliveryDetail: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const deliveryDetail = await SupplierDeliveryDetail.findByPk(
        req.params.id,
        { transaction }
      );
      if (!deliveryDetail) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Detalle de entrega no encontrado" });
      }

      await deliveryDetail.destroy({ transaction });
      await transaction.commit();
      res
        .status(200)
        .json({ message: "Detalle de entrega eliminado correctamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        message: "Error al eliminar el detalle de entrega",
        error: error.message,
      });
    }
  },
};
