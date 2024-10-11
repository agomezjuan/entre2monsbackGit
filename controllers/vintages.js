const { Vintage, Wine, Grape } = require("../database/models");

module.exports = {
  // GET all Vintages
  getAllVintages: async (req, res) => {
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

  // GET a single Vintage by ID
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

  // POST a new Vintage
  createVintage: async (req, res) => {
    try {
      const { vintage, wineIds, grapeIds } = req.body;

      if (!vintage) {
        return res.status(400).json({ error: "Vintage year is required" });
      }

      // Create the new vintage
      const createdVintage = await Vintage.create({
        vintage,
      });

      // Add Wines if provided
      if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({
          where: { id: wineIds },
        });
        await createdVintage.addWines(wines);
      }

      // Add Grapes if provided
      if (grapeIds && Array.isArray(grapeIds)) {
        const grapes = await Grape.findAll({
          where: { id: grapeIds },
        });
        await createdVintage.addGrapes(grapes);
      }

      // Retrieve the created vintage with associations
      const vintageWithAssociations = await Vintage.findByPk(
        createdVintage.id,
        {
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
        }
      );

      res.status(201).json({
        message: "Vintage created successfully",
        vintage: vintageWithAssociations,
      });
    } catch (error) {
      console.error("Error creating vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE a Vintage by ID
  deleteVintage: async (req, res) => {
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

      // Remove associations with Wines and Grapes before deleting
      await vintage.setWines([]);
      await vintage.setGrapes([]);

      await vintage.destroy();
      res.json({ message: `Vintage with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting vintage:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT update a Vintage by ID
  updateVintage: async (req, res) => {
    try {
      const { id } = req.params;
      const { vintage, wineIds, grapeIds } = req.body;

      const existingVintage = await Vintage.findByPk(id);
      if (!existingVintage) {
        return res.status(404).json({ error: "Vintage not found" });
      }

      // Update the vintage details
      await existingVintage.update({
        vintage,
      });

      // Update Wines if provided
      if (wineIds && Array.isArray(wineIds)) {
        const wines = await Wine.findAll({
          where: { id: wineIds },
        });
        await existingVintage.setWines(wines);
      }

      // Update Grapes if provided
      if (grapeIds && Array.isArray(grapeIds)) {
        const grapes = await Grape.findAll({
          where: { id: grapeIds },
        });
        await existingVintage.setGrapes(grapes);
      } else if (!grapeIds || grapeIds.length === 0) {
        // If grapeIds is not provided or empty, clear the existing associations
        await existingVintage.setGrapes([]);
      }

      // Retrieve the updated vintage with associations
      const updatedVintage = await Vintage.findByPk(id, {
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
