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

    if (!supplier || !supplier.nif) {
      throw new Error("Datos del proveedor incompletos");
    }

    // 1️⃣ Buscar o crear el proveedor por NIF
    let supplierInstance = await Supplier.findOne({
      where: { nif: supplier.nif.trim() },
      transaction,
    });

    if (!supplierInstance) {
      supplierInstance = await Supplier.create(
        {
          tradeName: supplier.tradeName,
          legalName: supplier.legalName,
          nif: supplier.nif,
          email: supplier.email,
          phone: supplier.phone,
          web: supplier.web,
        },
        { transaction }
      );
    }

    const supplierId = supplierInstance.id;

    // 2️⃣ Crear direcciones asociadas
    const createdAddresses = await Promise.all(
      addresses.map((addr) =>
        SupplierAddress.create({ ...addr, supplierId }, { transaction })
      )
    );

    // 3️⃣ Crear representantes asociados
    const createdRepresentatives = await Promise.all(
      representatives.map((rep) =>
        SupplierRepresentative.create({ ...rep, supplierId }, { transaction })
      )
    );

    // 4️⃣ Crear detalle de entrega y asociar días
    let createdDeliveryDetail = null;

    if (deliveryDetail) {
      const { dayIds = [], ...rest } = deliveryDetail;

      if (dayIds.length > 0) {
        const days = await Day.findAll({
          where: { id: dayIds },
          transaction,
        });

        if (days.length !== dayIds.length) {
          throw new Error("Algunos días de reparto no existen");
        }

        createdDeliveryDetail = await SupplierDeliveryDetail.create(
          { ...rest, supplierId },
          { transaction }
        );

        await createdDeliveryDetail.setDays(days, { transaction });
      } else {
        // Sin días, pero con datos de delivery
        createdDeliveryDetail = await SupplierDeliveryDetail.create(
          { ...rest, supplierId },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return {
      supplier: {
        id: supplierInstance.id,
        tradeName: supplierInstance.tradeName,
        created: !payload.supplierId, // indica si fue nuevo o ya existía
      },
      addresses: createdAddresses.map((a) => ({
        id: a.id,
        street: a.street,
      })),
      representatives: createdRepresentatives.map((r) => ({
        id: r.id,
        name: `${r.firstName} ${r.lastName}`,
      })),
      deliveryDetail: createdDeliveryDetail
        ? {
            id: createdDeliveryDetail.id,
            minPurchase: createdDeliveryDetail.minPurchase,
          }
        : null,
    };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al crear el proveedor: ${error.message}`);
  }
}

module.exports = {
  createSupplierPackService,
};
