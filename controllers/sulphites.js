const { Sulphite } = require("../database/models");

module.exports = {
  /*
   * GET  - get all sulphites
   */
  getAllSulphites: async (req, res, next) => {
    try {
      const sulphites = await Sulphite.findAll();
      console.log("All sulphites:", JSON.stringify(sulphites, null, 2));
      res.json(sulphites);
    } catch (error) {
      console.error("Error retrieving sulphites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /*
   * POST - create a new sulphite
   */
  createSulphite: async (req, res, next) => {
    const { sulphiteMin, sulphiteMax } = req.body;
    console.log(req.body);
    console.log(JSON.stringify(Sulphite));
    if (!sulphiteMin && !sulphiteMax) {
      return res.status(400).json({ error: "Sulphite is required" });
    }
    try {
      const createdSulphite = await Sulphite.create({
        sulphiteMin,
        sulphiteMax,
      });
      console.log("created sulphite", createdSulphite);
      res.status(200).json({
        message: "Sulphite created succesfully",
        sulphite: createdSulphite,
      });
    } catch (error) {
      console.error("Error creating sulphite:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Sulphite type must be unique" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /*
   * DELETE - delete a sulphite
   */
  deleteSulphite: async (req, res) => {
    const { id } = req.params;

    try {
      const sulphite = await Sulphite.findByPk(id);
      if (!sulphite) {
        return res.status(404).json({ error: "Sulphite is not found" });
      }

      await sulphite.destroy();
      console.log(`Deleted sulphite with ID: ${id}`);
      res.json({ message: `Sulphite with ID: ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting sulphite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /*
   * PUT - update a sulphite
   */
  updateSulphite: async (req, res) => {
    const { id } = req.params;
    const { sulphite: newSulphiteName } = req.body;
    try {
      const sulphiteToUpdate = await Sulphite.findByPk(id); //
      if (!sulphiteToUpdate) {
        return res.status(404).json({ error: "Sulphite not found" });
      }
      await sulphiteToUpdate.update({ sulphite: newSulphiteName });
      console.log(`Sulphite with ID: ${id} has been updated`);
      res.json({ message: `Sulphite with ID: ${id} has been updated` });
    } catch (error) {
      console.error("Error updating sulphite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /*
   * GET - get a sulphite by id
   */
  getSulphiteById: async (req, res) => {
    const { id } = req.params;
    try {
      const sulphite = await Sulphite.findByPk(id);
      if (!sulphite) {
        return res.status(404).json({ error: "Sulphite not found" });
      }
      console.log("Sulphite by ID:", JSON.stringify(sulphite, null, 2));
      res.json(sulphite);
    } catch (error) {
      console.error("Error retrieving sulphite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
