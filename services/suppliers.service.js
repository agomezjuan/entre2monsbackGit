const {
  Supplier,
  SupplierAddress,
  SupplierRepresentative,
  SupplierDeliveryDetail,
  Day,
  sequelize,
} = require("../database/models");

async function createSupplierPackService(payload) {
  const transaction = await sequelize.transaction();

  try {
    const {
      supplier,
      addresses = [],
      representatives = [],
      deliveryDetail,
    } = payload;

    // 1️⃣ Crear el proveedor
    const newSupplier = await Supplier.create(supplier, { transaction });

    // 2️⃣ Crear direcciones asociadas
    const createdAddresses = await Promise.all(
      addresses.map((addr) =>
        SupplierAddress.create(
          { ...addr, supplierId: newSupplier.id },
          { transaction }
        )
      )
    );

    // 3️⃣ Crear representantes asociados
    const createdRepresentatives = await Promise.all(
      representatives.map((rep) =>
        SupplierRepresentative.create(
          { ...rep, supplierId: newSupplier.id },
          { transaction }
        )
      )
    );

    // 4️⃣ Crear detalle de entrega
    let createdDeliveryDetail = null;

    if (deliveryDetail) {
      const { dayIds = [], ...rest } = deliveryDetail;

      // Verificar que los días existen
      const days = await Day.findAll({
        where: { id: dayIds },
        transaction,
      });

      if (days.length !== dayIds.length) {
        throw new Error("Algunos días de reparto no existen");
      }

      // Crear el detalle
      createdDeliveryDetail = await SupplierDeliveryDetail.create(
        { ...rest, supplierId: newSupplier.id },
        { transaction }
      );

      await createdDeliveryDetail.setDays(days, { transaction });
    }

    await transaction.commit();

    return {
      supplier: newSupplier,
      addresses: createdAddresses,
      representatives: createdRepresentatives,
      deliveryDetail: createdDeliveryDetail,
    };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al crear el proveedor: ${error.message}`);
  }
}

module.exports = {
  createSupplierPackService,
};
