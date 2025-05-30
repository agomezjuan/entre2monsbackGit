// middlewares/authorizeRole.js
module.exports = function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
};
