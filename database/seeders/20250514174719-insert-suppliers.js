"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Asegurar que los días existen
    const dayNames = ["Lunes", "Miércoles", "Viernes"];

    const existingDays = await queryInterface.sequelize.query(`
      SELECT id, name FROM days WHERE name IN (${dayNames
        .map((name) => `'${name}'`)
        .join(", ")})
    `);

    let dayMap = Object.fromEntries(existingDays[0].map((d) => [d.name, d.id]));

    const missingDays = dayNames.filter((name) => !dayMap[name]);

    if (missingDays.length > 0) {
      const insertedDays = await queryInterface.bulkInsert(
        "days",
        missingDays.map((name) => ({
          name,
          active: true,
        })),
        { returning: true }
      );

      // Reconsultar días para actualizar el map
      const updatedDays = await queryInterface.sequelize.query(`
        SELECT id, name FROM days WHERE name IN (${dayNames
          .map((name) => `'${name}'`)
          .join(", ")})
      `);
      dayMap = Object.fromEntries(updatedDays[0].map((d) => [d.name, d.id]));
    }

    // 2. Obtener regiones
    const regionNames = ["La Rioja", "Bordeaux", "Toscana"];
    const regionQuery = await queryInterface.sequelize.query(`
      SELECT id, name FROM regions WHERE name IN (${regionNames
        .map((name) => `'${name}'`)
        .join(", ")})
    `);

    const regionMap = Object.fromEntries(
      regionQuery[0].map((r) => [r.name, r.id])
    );

    if (Object.keys(regionMap).length !== 3) {
      throw new Error(
        "❌ Faltan regiones requeridas (La Rioja, Bordeaux, Toscana)"
      );
    }

    // 3. Insertar suppliers
    const suppliers = await queryInterface.bulkInsert(
      "suppliers",
      [
        {
          trade_name: "Vinos del Norte",
          legal_name: "Vinos del Norte S.A.",
          nif: "ESB12345678",
          email: "info@nortevinos.com",
          phone: "+34910000001",
          web: "https://nortevinos.com",
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          trade_name: "Château Select",
          legal_name: "Château Select SARL",
          nif: "FRAB1234567",
          email: "contact@chateau-select.fr",
          phone: "+33123456789",
          web: "https://chateau-select.fr",
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          trade_name: "Cantina Italiana",
          legal_name: "Cantina Italiana SRL",
          nif: "ITZ123456789",
          email: "info@cantinaitaliana.it",
          phone: "+390612345678",
          web: "https://cantinaitaliana.it",
          active: true,
          created_at: now,
          updated_at: now,
        },
      ],
      { returning: true }
    );

    const supplierQuery = await queryInterface.sequelize.query(`
      SELECT id, trade_name FROM suppliers WHERE trade_name IN 
      ('Vinos del Norte', 'Château Select', 'Cantina Italiana')
    `);

    const supplierMap = Object.fromEntries(
      supplierQuery[0].map((s) => [s.trade_name, s.id])
    );

    // 4. Insertar direcciones
    await queryInterface.bulkInsert("supplier_addresses", [
      {
        supplier_id: supplierMap["Vinos del Norte"],
        street: "Calle del Vino, 12",
        city: "Logroño",
        postal_code: "26001",
        region_id: regionMap["La Rioja"],
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        supplier_id: supplierMap["Château Select"],
        street: "Rue des Grands Crus, 45",
        city: "Bordeaux",
        postal_code: "33000",
        region_id: regionMap["Bordeaux"],
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        supplier_id: supplierMap["Cantina Italiana"],
        street: "Via del Chianti, 7",
        city: "Florencia",
        postal_code: "50125",
        region_id: regionMap["Toscana"],
        active: true,
        created_at: now,
        updated_at: now,
      },
    ]);

    // 5. Insertar detalles de entrega
    const deliveryDetails = await queryInterface.bulkInsert(
      "supplier_delivery_details",
      [
        {
          supplier_id: supplierMap["Vinos del Norte"],
          min_purchase: 150.0,
          delivery_tax: 10.0,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          supplier_id: supplierMap["Château Select"],
          min_purchase: 200.0,
          delivery_tax: 15.0,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          supplier_id: supplierMap["Cantina Italiana"],
          min_purchase: 100.0,
          delivery_tax: 8.0,
          active: true,
          created_at: now,
          updated_at: now,
        },
      ],
      { returning: true }
    );

    const deliveryDetailQuery = await queryInterface.sequelize.query(`
      SELECT id, supplier_id FROM supplier_delivery_details
      WHERE supplier_id IN (${Object.values(supplierMap).join(",")})
    `);

    // 6. Asociar días a los detalles de entrega
    const deliveryDays = [];

    for (const detail of deliveryDetailQuery[0]) {
      for (const dayName of dayNames) {
        deliveryDays.push({
          supplier_delivery_detail_id: detail.id,
          day_id: dayMap[dayName],
        });
      }
    }

    await queryInterface.bulkInsert("supplier_delivery_days", deliveryDays);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("supplier_delivery_days", null, {});
    await queryInterface.bulkDelete("supplier_delivery_details", null, {});
    await queryInterface.bulkDelete("supplier_addresses", null, {});
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
