const {
  Supplier,
  SupplierAddress,
  SupplierRepresentative,
  SupplierDeliveryDetail,
  Day,
  sequelize,
} = require("../database/models");

// 🔹 CREATE
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

    const createdAddresses = await Promise.all(
      addresses.map((addr) =>
        SupplierAddress.create({ ...addr, supplierId }, { transaction })
      )
    );

    const createdRepresentatives = await Promise.all(
      representatives.map((rep) =>
        SupplierRepresentative.create({ ...rep, supplierId }, { transaction })
      )
    );

    let createdDeliveryDetail = null;

    if (deliveryDetail) {
      const { dayIds = [], ...rest } = deliveryDetail;

      createdDeliveryDetail = await SupplierDeliveryDetail.create(
        { ...rest, supplierId },
        { transaction }
      );

      if (dayIds.length > 0) {
        const days = await Day.findAll({
          where: { id: dayIds },
          transaction,
        });
        await createdDeliveryDetail.setDays(days, { transaction });
      }
    }

    await transaction.commit();

    return {
      supplier: {
        id: supplierInstance.id,
        tradeName: supplierInstance.tradeName,
        created: !payload.supplierId,
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

// 🔹 UPDATE
async function updateSupplierPackService(payload) {
  const transaction = await sequelize.transaction();

  try {
    const { supplier, address, representative, deliveryDetail } = payload;

    if (!supplier?.nif) {
      throw new Error("NIF requerido para identificar el proveedor");
    }

    // 1️⃣ Buscar proveedor por NIF
    const supplierInstance = await Supplier.findOne({
      where: { nif: supplier.nif.trim() },
      transaction,
    });

    if (!supplierInstance) {
      throw new Error("Proveedor no encontrado");
    }

    // 2️⃣ Actualizar campos del proveedor si han cambiado
    await supplierInstance.update(
      {
        tradeName: supplier.tradeName ?? supplierInstance.tradeName,
        legalName: supplier.legalName ?? supplierInstance.legalName,
        email: supplier.email ?? supplierInstance.email,
        phone: supplier.phone ?? supplierInstance.phone,
        web: supplier.web ?? supplierInstance.web,
      },
      { transaction }
    );

    // 3️⃣ Actualizar dirección si hay ID
    if (address?.id) {
      const addressInstance = await SupplierAddress.findByPk(address.id, {
        transaction,
      });

      if (addressInstance) {
        await addressInstance.update(
          {
            street: address.street ?? addressInstance.street,
            city: address.city ?? addressInstance.city,
            postalCode: address.postalCode ?? addressInstance.postalCode,
            regionId: address.regionId ?? addressInstance.regionId,
          },
          { transaction }
        );
      }
    }

    // 4️⃣ Actualizar representante si hay ID
    if (representative?.id) {
      const repInstance = await SupplierRepresentative.findByPk(
        representative.id,
        { transaction }
      );

      if (repInstance) {
        const updates = {};

        if (
          representative.firstName &&
          representative.firstName !== repInstance.firstName
        ) {
          updates.firstName = representative.firstName;
        }

        if (
          representative.lastName &&
          representative.lastName !== repInstance.lastName
        ) {
          updates.lastName = representative.lastName;
        }

        if (
          representative.email &&
          representative.email !== repInstance.email
        ) {
          // 💥 Verificar duplicado antes de aplicar
          const emailExists = await SupplierRepresentative.findOne({
            where: { email: representative.email },
            transaction,
          });

          if (emailExists && emailExists.id !== repInstance.id) {
            throw new Error(
              `El email "${representative.email}" ya está en uso.`
            );
          }

          updates.email = representative.email;
        }

        if (
          representative.phone &&
          representative.phone !== repInstance.phone
        ) {
          updates.phone = representative.phone;
        }

        if (Object.keys(updates).length > 0) {
          await repInstance.update(updates, { transaction });
        }
      }
    }

    // 5️⃣ Actualizar detalle de entrega
    if (deliveryDetail?.id) {
      const detail = await SupplierDeliveryDetail.findByPk(deliveryDetail.id, {
        include: ["days"],
        transaction,
      });

      if (detail) {
        await detail.update(
          {
            minPurchase: deliveryDetail.minPurchase,
            deliveryTax: deliveryDetail.deliveryTax,
          },
          { transaction }
        );

        if (deliveryDetail.dayIds) {
          await detail.setDays(deliveryDetail.dayIds, { transaction });
        }
      }
    }

    await transaction.commit();

    return {
      supplierId: supplierInstance.id,
      updated: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al actualizar el proveedor:", error);
    throw new Error(`Error al actualizar el proveedor: ${error.message}`);
  }
}

async function toggleSupplierStatusService(id) {
  const t = await sequelize.transaction();

  try {
    const supplier = await Supplier.findByPk(id, {
      transaction: t,
      include: [
        { model: SupplierAddress, as: "addresses" },
        { model: SupplierRepresentative, as: "representatives" },
        {
          model: SupplierDeliveryDetail,
          as: "deliveryDetail",
          include: ["days"],
        },
      ],
    });

    if (!supplier) throw new Error(`Proveedor con ID ${id} no encontrado`);

    const newState = !supplier.active;

    await supplier.update({ active: newState }, { transaction: t });

    for (const address of supplier.addresses || []) {
      await address.update({ active: newState }, { transaction: t });
    }

    for (const rep of supplier.representatives || []) {
      await rep.update({ active: newState }, { transaction: t });
    }

    if (supplier.deliveryDetail) {
      await supplier.deliveryDetail.update(
        { active: newState },
        { transaction: t }
      );
    } else {
      console.warn(
        `⚠️ El proveedor ${supplier.id} no tiene deliveryDetail asociado`
      );
    }

    await t.commit();

    return { id: supplier.id, active: newState };
  } catch (err) {
    await t.rollback();
    console.error("❌ Error en toggleSupplierStatusService:", err);
    throw err;
  }
}

// 🔚 Exporta ambos
module.exports = {
  createSupplierPackService,
  updateSupplierPackService,
  toggleSupplierStatusService,
};
