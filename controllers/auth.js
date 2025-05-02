const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../database/models");

const authController = {
  register: async (req, res) => {
    try {
      const { username, userSurname, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // ⚠️ Siempre se registra como 'user', sin importar lo que venga del frontend
      const newUser = await User.create({
        username,
        userSurname,
        email,
        password: hashedPassword,
        role: "user", // forzado aquí
      });

      res.status(201).json({
        message: "Usuario registrado correctamente",
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(401).json({ message: "Credenciales inválidas" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: "Credenciales inválidas" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
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
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

module.exports = authController;
