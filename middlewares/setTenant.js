module.exports = (req, res, next) => {
  const tokenData = req.user; // viene del JWT
  if (tokenData && tokenData.tenantId) {
    req.context = { tenantId: tokenData.tenantId };
  }
  next();
};
