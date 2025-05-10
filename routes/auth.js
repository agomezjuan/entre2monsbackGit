const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

// Registro
router.post("/register/b2b", authController.registerB2B);
router.post("/register/b2c", authController.registerB2C);

// Login
router.post("/login", authController.login);

// Rutas protegidas
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Perfil del usuario autenticado",
    user: req.user,
  });
});

router.get("/admin", verifyToken, requireRole(["admin"]), (req, res) => {
  res.json({
    message: "Área de administración. Acceso autorizado.",
    user: req.user,
  });
});

router.get(
  "/dashboard",
  verifyToken,
  requireRole(["admin", "user"]),
  (req, res) => {
    res.json({
      message: "Dashboard general",
      user: req.user,
    });
  }
);

module.exports = router;
