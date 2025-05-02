const {
  Supplier,
  SupplierAddress,
  SupplierRepresentative,
  SupplierDeliveryDetail,
  Day,
} = require("../database/models");

module.exports = {
  // Obtener todos los proveedores
  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.findAll({
        include: [
          { model: SupplierAddress, as: "addresses" },
          { model: SupplierRepresentative, as: "representatives" },
          {
            model: SupplierDeliveryDetail,
            as: "deliveryDetail",
            include: [
              {
                model: Day,
                as: "days", // Alias para la relación de muchos a muchos con Day
                attributes: ["id", "name"], // Solo traer campos necesarios
                through: { attributes: [] }, // Omite los atributos de la tabla intermedia
              },
            ],
          },
        ],
      });
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los proveedores",
        error: error.message,
      });
    }
  },

  // Obtener un proveedor específico por ID
  getSupplierById: async (req, res) => {
    try {
      const supplier = await Supplier.findByPk(req.params.id, {
        include: [
          { model: SupplierAddress, as: "addresses" }, // Cambia "address" a "addresses"
          { model: SupplierRepresentative, as: "representatives" },
        ],
      });
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(404).json({ message: "Proveedor no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el proveedor",
        error: error.message,
      });
    }
  },

  getSupplierRelations: async (req, res) => {
    try {
      const supplierId = req.params.id;

      const supplier = await Supplier.findByPk(supplierId);
      if (!supplier) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      const addressCount = await SupplierAddress.count({
        where: { supplierId },
      });

      const cellars = await supplier.getCellars(); // muchas a muchas

      res.status(200).json({
        relaciones: {
          direcciones: addressCount,
          bodegas: cellars.map((c) => ({
            id: c.id,
            name: c.name,
          })),
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las relaciones del proveedor",
        error: error.message,
      });
    }
  },

  // Crear un nuevo proveedor
  createSupplier: async (req, res) => {
    const { tradeName, legalName, nif, email, phone, web, addressId } =
      req.body;
    try {
      const newSupplier = await Supplier.create({
        tradeName,
        legalName,
        nif,
        email,
        phone,
        web,
        addressId,
      });
      res.status(201).json(newSupplier);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el proveedor", error: error.message });
    }
  },

  // Actualizar un proveedor por ID
  updateSupplier: async (req, res) => {
    const { tradeName, legalName, nif, email, phone, web } = req.body;
    try {
      const supplier = await Supplier.findByPk(req.params.id);
      if (supplier) {
        await supplier.update({
          tradeName,
          legalName,
          nif,
          email,
          phone,
          web,
        });
        res.status(200).json(supplier);
      } else {
        res.status(404).json({ message: "Proveedor no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el proveedor",
        error: error.message,
      });
    }
  },

  // Eliminar un proveedor por ID
  deleteSupplier: async (req, res) => {
    try {
      const supplierId = req.params.id;

      const supplier = await Supplier.findByPk(supplierId);
      if (!supplier) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      // 🔍 Verificar direcciones vinculadas
      const addressCount = await SupplierAddress.count({
        where: { supplierId },
      });

      // 🔍 Verificar bodegas asociadas (many-to-many)
      const cellarCount = await supplier.countCellars(); // gracias a belongsToMany

      if (addressCount > 0 || cellarCount > 0) {
        return res.status(400).json({
          message:
            "No se puede eliminar el proveedor porque tiene relaciones activas.",
          relaciones: {
            direcciones: addressCount,
            bodegas: cellarCount,
          },
        });
      }

      await supplier.destroy();
      res.status(200).json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el proveedor",
        error: error.message,
      });
    }
  },
};
