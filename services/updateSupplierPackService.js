const {
  Supplier,
  SupplierAddress,
  SupplierRepresentative,
  SupplierDeliveryDetail,
  sequelize,
} = require("../database/models");

function cleanFields(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
}

async function updateSupplierPackService(payload) {
  const transaction = await sequelize.transaction();

  try {
    const {
      supplier,
      address, // solo una dirección
      representative, // solo uno
      deliveryDetail,
    } = payload;

    if (!supplier?.nif) {
      throw new Error("NIF requerido para identificar el proveedor.");
    }

    // 1️⃣ Buscar proveedor por NIF
    const supplierInstance = await Supplier.findOne({
      where: { nif: supplier.nif.trim() },
      transaction,
    });

    if (!supplierInstance) {
      throw new Error("Proveedor no encontrado.");
    }

    const supplierId = supplierInstance.id;

    // 2️⃣ Actualizar proveedor si hay datos nuevos
    const supplierFields = cleanFields({
      tradeName: supplier.tradeName,
      legalName: supplier.legalName,
      email: supplier.email,
      phone: supplier.phone,
      web: supplier.web,
    });

    if (Object.keys(supplierFields).length > 0) {
      await supplierInstance.update(supplierFields, { transaction });
    }

    // 3️⃣ Actualizar dirección (si viene con ID y pertenece al proveedor)
    if (address?.id) {
      const addressInstance = await SupplierAddress.findOne({
        where: { id: address.id, supplierId },
        transaction,
      });

      if (!addressInstance) {
        throw new Error("Dirección no encontrada o no pertenece al proveedor.");
      }

      await addressInstance.update(cleanFields(address), { transaction });
    }

    // 4️⃣ Actualizar representante (si viene con ID y pertenece al proveedor)
    if (representative?.id) {
      const repInstance = await SupplierRepresentative.findOne({
        where: { id: representative.id, supplierId },
        transaction,
      });

      if (!repInstance) {
        throw new Error(
          "Representante no encontrado o no pertenece al proveedor."
        );
      }

      await repInstance.update(cleanFields(representative), { transaction });
    }

    // 5️⃣ Actualizar condiciones de entrega
    if (deliveryDetail?.id) {
      const detail = await SupplierDeliveryDetail.findOne({
        where: { id: deliveryDetail.id, supplierId },
        include: ["days"],
        transaction,
      });

      if (!detail) {
        throw new Error(
          "Detalle de entrega no encontrado o no pertenece al proveedor."
        );
      }

      const fieldsToUpdate = cleanFields({
        minPurchase: deliveryDetail.minPurchase,
        deliveryTax: deliveryDetail.deliveryTax,
      });

      await detail.update(fieldsToUpdate, { transaction });

      if (Array.isArray(deliveryDetail.dayIds)) {
        await detail.setDays(deliveryDetail.dayIds, { transaction });
      }
    }

    await transaction.commit();

    return {
      supplierId,
      updated: true,
    };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al actualizar el proveedor: ${error.message}`);
  }
}

module.exports = {
  updateSupplierPackService,
};
