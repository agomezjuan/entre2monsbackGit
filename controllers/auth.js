const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Tenant } = require("../database/models");

const authController = {
  register: async (req, res) => {
    try {
      const {
        username,
        userSurname,
        email,
        password,
        tenantName,
        role: requestedRole,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Validación de rol
      const allowedRoles = ["user", "business", "admin"];
      const role = allowedRoles.includes(requestedRole)
        ? requestedRole
        : "user";

      // Buscar o crear tenant
      let tenant = await Tenant.findOne({ where: { name: tenantName } });
      if (!tenant) {
        tenant = await Tenant.create({ name: tenantName });
      }

      const newUser = await User.create({
        username,
        userSurname,
        email,
        password: hashedPassword,
        role, // ya validado
        tenantId: tenant.id,
      });

      res.status(201).json({
        message: "Usuario registrado correctamente",
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          tenantId: newUser.tenantId,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email, active: true } });

      if (!user)
        return res.status(401).json({ message: "Credenciales inválidas" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: "Credenciales inválidas" });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
        },
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login correcto",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

module.exports = authController;
