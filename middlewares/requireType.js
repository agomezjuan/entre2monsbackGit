// middlewares/requireType.js

module.exports = function requireType(...allowedTypes) {
  return (req, res, next) => {
    // Asegura que el usuario esté autenticado y tenga un tipo válido
    if (!req.user || !allowedTypes.includes(req.user.type)) {
      return res
        .status(403)
        .json({ message: "No autorizado por tipo de usuario" });
    }

    next();
  };
};
