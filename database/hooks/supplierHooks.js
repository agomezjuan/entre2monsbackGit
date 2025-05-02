module.exports = {
  async afterSupplierUpdate(supplier, options) {
    if (supplier.changed("active") && supplier.active === false) {
      const {
        SupplierAddress,
        SupplierRepresentative,
        SupplierDeliveryDetail,
        SupplierDeliveryDay,
        CellarsSuppliers,
      } = supplier.sequelize.models;

      await SupplierAddress.update(
        { active: false },
        { where: { supplierId: supplier.id }, transaction: options.transaction }
      );

      await SupplierRepresentative.update(
        { active: false },
        { where: { supplierId: supplier.id }, transaction: options.transaction }
      );

      const deliveryDetail = await SupplierDeliveryDetail.findOne({
        where: { supplierId: supplier.id },
        transaction: options.transaction,
      });

      if (deliveryDetail) {
        await deliveryDetail.update(
          { active: false },
          { transaction: options.transaction }
        );

        await SupplierDeliveryDay.update(
          { active: false },
          {
            where: { supplier_delivery_detail_id: deliveryDetail.id },
            transaction: options.transaction,
          }
        );
      }

      await CellarsSuppliers.update(
        { active: false },
        {
          where: { supplier_id: supplier.id },
          transaction: options.transaction,
        }
      );
    }
  },
};
