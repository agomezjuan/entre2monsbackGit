// hooks/tenant.js
function addTenantHooks(model) {
  // Filtro automático en todas las búsquedas
  model.addHook("beforeFind", (options) => {
    if (!options.where) options.where = {};
    if (options.tenantId) {
      options.where.tenant_id = options.tenantId;
    }
  });

  // Asignación automática al crear
  model.addHook("beforeCreate", (instance, options) => {
    if (options.tenantId) {
      instance.tenant_id = options.tenantId;
    }
  });

  // Bulk create con tenant
  model.addHook("beforeBulkCreate", (instances, options) => {
    if (options.tenantId) {
      instances.forEach((i) => {
        i.tenant_id = options.tenantId;
      });
    }
  });
}

module.exports = addTenantHooks;
