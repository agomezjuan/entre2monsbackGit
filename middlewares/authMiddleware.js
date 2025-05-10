const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); // No token

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido

    req.user = user; // contiene id, email, role, tenantId, type
    req.context = {
      tenantId: user.tenantId || null,
      type: user.type, // 💥 ahora siempre disponible
      role: user.role,
    };

    next();
  });
};

// Middleware por rol
const requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  requireRole,
};
