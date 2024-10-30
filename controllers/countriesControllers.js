const { Country, sequelize } = require("../database/models");

module.exports = {
  // Obtener todos los países
  getAllCountries: async (req, res) => {
    try {
      const countries = await Country.findAll();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los países", error });
    }
  },

  // Obtener un país por ID
  getCountryById: async (req, res) => {
    const { id } = req.params;
    try {
      const country = await Country.findByPk(id);
      if (!country) {
        return res.status(404).json({ message: "País no encontrado" });
      }
      res.status(200).json(country);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el país", error });
    }
  },

  // Obtener un país por nombre
  getCountryByName: async (req, res) => {
    const { name } = req.params;
    try {
      const country = await Country.findOne({ where: { name } });
      if (!country) {
        return res.status(404).json({ message: "País no encontrado" });
      }
      res.status(200).json(country);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el país por nombre", error });
    }
  },

  // Crear un nuevo país
  createCountry: async (req, res) => {
    const { name, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const newCountry = await Country.create(
        { name, description },
        { transaction }
      );
      await transaction.commit();
      res.status(201).json(newCountry);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al crear el país", error });
    }
  },

  // Actualizar un país existente por ID
  updateCountry: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const country = await Country.findByPk(id, { transaction });
      if (!country) {
        await transaction.rollback();
        return res.status(404).json({ message: "País no encontrado" });
      }
      country.name = name || country.name;
      country.description = description || country.description;
      await country.save({ transaction });
      await transaction.commit();
      res.status(200).json(country);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al actualizar el país", error });
    }
  },

  // Actualizar un país existente por nombre
  updateCountryByName: async (req, res) => {
    const { name } = req.params;
    const { newName, description } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const country = await Country.findOne({ where: { name }, transaction });
      if (!country) {
        await transaction.rollback();
        return res.status(404).json({ message: "País no encontrado" });
      }
      country.name = newName || country.name;
      country.description = description || country.description;
      await country.save({ transaction });
      await transaction.commit();
      res.status(200).json(country);
    } catch (error) {
      await transaction.rollback();
      res
        .status(500)
        .json({ message: "Error al actualizar el país por nombre", error });
    }
  },

  // Eliminar un país
  deleteCountry: async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const country = await Country.findByPk(id, { transaction });
      if (!country) {
        await transaction.rollback();
        return res.status(404).json({ message: "País no encontrado" });
      }
      await country.destroy({ transaction });
      await transaction.commit();
      res.status(204).send();
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: "Error al eliminar el país", error });
    }
  },
};
