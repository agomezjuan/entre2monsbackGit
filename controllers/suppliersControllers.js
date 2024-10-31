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
    const { tradeName, legalName, nif, email, phone, web, addressId } =
      req.body;
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
          addressId,
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
      const supplier = await Supplier.findByPk(req.params.id);
      if (supplier) {
        await supplier.destroy();
        res.status(200).json({ message: "Proveedor eliminado correctamente" });
      } else {
        res.status(404).json({ message: "Proveedor no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el proveedor",
        error: error.message,
      });
    }
  },
};
