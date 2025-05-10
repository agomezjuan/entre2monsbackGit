const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Tenant } = require("../database/models");

const authController = {
  registerB2B: async (req, res) => {
    const { username, userSurname, email, password, tenantName } = req.body;

    if (!tenantName) {
      return res.status(400).json({ error: "Falta tenantName" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      let tenant = await Tenant.findOne({ where: { name: tenantName } });
      if (!tenant)
        tenant = await Tenant.create({ name: tenantName, active: true });

      const user = await User.create({
        username,
        userSurname,
        email,
        password: hashedPassword,
        role: "admin",
        tenantId: tenant.id,
      });

      res.status(201).json({
        message: "B2B registrado",
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: "Este correo ya está registrado" });
      }

      console.error("Error en registerB2B:", error);
      res.status(500).json({ error: "Error interno al registrar" });
    }
  },

  registerB2C: async (req, res) => {
    const { username, userSurname, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        userSurname,
        email,
        password: hashedPassword,
        role: "client", // siempre 'client' para B2C
        tenantId: null, // ningún tenant
      });

      res.status(201).json({
        message: "B2C registrado",
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: "Este correo ya está registrado" });
      }

      console.error("Error en registerB2C:", error);
      res.status(500).json({ error: "Error interno al registrar" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email, active: true },
        include: [{ model: Tenant, as: "tenant" }],
      });

      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      if (user.tenantId && (!user.tenant || !user.tenant.active)) {
        return res.status(403).json({ message: "Tenant inactivo" });
      }

      // ✅ Aquí añadimos tenant.name al token si es B2B
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        type: user.tenantId ? "b2b" : "b2c",
        tenant: user.tenantId ? { name: user.tenant.name } : null,
      };
      console.log("🧪 Payload JWT:", tokenPayload);
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login correcto",
        token,
        user: tokenPayload, // también útil en el front
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

module.exports = authController;
