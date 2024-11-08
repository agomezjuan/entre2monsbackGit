"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const deliveryDetails = await queryInterface.sequelize.query(
      `SELECT id FROM supplier_delivery_details;`
    );
    const days = await queryInterface.sequelize.query(`SELECT id FROM days;`);
    await queryInterface.bulkInsert("supplier_delivery_days", [
      {
        supplier_delivery_detail_id: deliveryDetails[0][0].id,
        day_id: days[0][0].id,
      },
      {
        supplier_delivery_detail_id: deliveryDetails[0][1].id,
        day_id: days[0][1].id,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supplier_delivery_days", null, {});
  },
};
