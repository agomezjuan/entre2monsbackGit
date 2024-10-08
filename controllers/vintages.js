"use strict";

const { Vintage, Wine, Grape } = require("../database/models");

module.exports = {
  // GET: Get all vintages with related wines and grapes
  getVintages: async (req, res) => {
    try {
      const vintages = await Vintage.findAll({
        include: [
          {
            model: Wine,
            as: "wines",
          },
          {
            model: Grape,
            as: "grapes",
          },
        ],
      });
      res.json(vintages);
    } catch (error) {
      console.error("Error retrieving vintages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET: Get a single vintage by ID with related wines and grapes
  getVintageById: async (req, res) => {
    try {
      const { id } = req.params;
      const vintage = await Vintage.findByPk(id, {
        include: [
          {
            model: Wine,
            as: "wines",
          },
          {
            model: Grape,
            as: "grapes",
          },
        ],
      });
      if (!vintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }
      res.json(vintage);
    } catch (error) {
      console.error("Error retrieving vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // POST: Create a new vintage
  createVintage: async (req, res) => {
    try {
      const { vintage, wineId, grapeId } = req.body;
      console.log(req.body);

      if (!vintage) {
        return res.status(400).json({ error: "Vintage year is required" });
      }

      const createdVintage = await Vintage.create({
        vintage,
        wineId,
        grapeId,
      });

      wineId.forEach(async (wineId) => {
        const wine = await Wine.findByPk(wineId);
        await createdVintage.addWine(wine);
      });

      grapeId.forEach(async (grapeId) => {
        const grape = await Grape.findByPk(grapeId);
        await createdVintage.addGrape(grape);
      });

      console.log("Created vintage:", createdVintage);
      res.status(201).json({
        message: "Vintage created successfully",
        vintage: createdVintage,
      });
    } catch (error) {
      console.error("Error creating vintage:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Vintage year must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE: Delete a vintage by ID
  deleteVintage: async (req, res) => {
    try {
      const { id } = req.params;
      const vintage = await Vintage.findByPk(id);
      if (!vintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      await vintage.destroy();
      res.json({ message: `Vintage with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  //* PUT */
  updateVintage: async (req, res) => {
    try {
      const { id } = req.params;
      const { vintage, wineId, grapeId } = req.body;

      const updatedVintage = await Vintage.findByPk(id);
      if (!updatedVintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      await updatedVintage.update({
        vintage,
        wineId,
        grapeId,
      });

      wineId.forEach(async (wineId) => {
        const wine = await Wine.findByPk(wineId);
        await updatedVintage.addWine(wine);
      });

      grapeId.forEach(async (grapeId) => {
        const grape = await Grape.findByPk(grapeId);
        await updatedVintage.addGrape(grape);
      });

      console.log(`Updated vintage with ID: ${id}`);
      res.json({
        message: `Vintage with ID: ${id} updated successfully`,
        vintage: updatedVintage,
      });
    } catch (error) {
      console.error("Error updating vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
