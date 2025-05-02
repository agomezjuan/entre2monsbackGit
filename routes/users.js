const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

// 🟢 Registro de usuario
router.post("/register", authController.register);

// 🔐 Login y generación de token
router.post("/login", authController.login);

// 🔒 Ruta protegida (acceso solo para usuarios autenticados)
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Perfil del usuario autenticado",
    user: req.user,
  });
});

// 🔐 Ruta solo para administradores
router.get("/admin", verifyToken, requireRole(["admin"]), (req, res) => {
  res.json({
    message: "Área de administración. Acceso autorizado.",
    user: req.user,
  });
});

// 🔐 Ruta accesible solo a users y admins
router.get(
  "/dashboard",
  verifyToken,
  requireRole(["user", "admin"]),
  (req, res) => {
    res.json({
      message: "Dashboard general",
      user: req.user,
    });
  }
);

module.exports = router;
