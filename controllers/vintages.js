const { where } = require("sequelize");
const { Label, Grape } = require("../models");

module.exports = {
  // ** GET
  getAllLabels: async (req, res) => {
    try {
      const labels = await Label.findAll({
        include: [
          {
            vintage: 1900,
            wineId: 1,
          },
        ],
      });

      console.log("All labels:", JSON.stringify(labels, null, 2));
      res.json(labels);
    } catch (error) {
      console.error("Error retrieving labels:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
