module.exports = {
  async afterSupplierUpdate(supplier, options) {
    if (supplier.changed("active") && supplier.active === false) {
      const models = supplier.sequelize.models;

      // Desactivar direcciones
      await models.SupplierAddress.update(
        { active: false },
        {
          where: { supplierId: supplier.id },
          transaction: options.transaction,
        }
      );

      // Desactivar representantes
      await models.SupplierRepresentative.update(
        { active: false },
        {
          where: { supplierId: supplier.id },
          transaction: options.transaction,
        }
      );

      // Desactivar detalle de entrega si existe
      const deliveryDetail = await models.SupplierDeliveryDetail.findOne({
        where: { supplierId: supplier.id },
        transaction: options.transaction,
      });

      if (deliveryDetail) {
        await deliveryDetail.update(
          { active: false },
          { transaction: options.transaction }
        );

        if (models.SupplierDeliveryDay) {
          await models.SupplierDeliveryDay.update(
            { active: false },
            {
              where: {
                supplier_delivery_detail_id: deliveryDetail.id,
              },
              transaction: options.transaction,
            }
          );
        } else {
          console.warn(
            "⚠️ SupplierDeliveryDay no está definido en sequelize.models"
          );
        }
      } else {
        console.warn(
          `⚠️ No se encontró deliveryDetail para supplier ${supplier.id}`
        );
      }

      // Desactivar vinculación con cellars
      if (models.CellarsSuppliers) {
        await models.CellarsSuppliers.update(
          { active: false },
          {
            where: { supplier_id: supplier.id },
            transaction: options.transaction,
          }
        );
      } else {
        console.warn(
          "⚠️ CellarsSuppliers no está definido en sequelize.models"
        );
      }
    }
  },
};
