const { User } = require("../database/models");
const bcrypt = require("bcrypt");

// controllers/users.js

const getAllUsers = async (req, res) => {
  res.json({ message: "Listado de usuarios (placeholder)" });
};

const createAdmin = async (req, res) => {
  const { username, userSurname, email, password } = req.body;

  // Solo puede acceder aquí si `verifyToken + requireRole(['owner'])` se usó antes en la ruta
  try {
    const hash = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      username,
      userSurname,
      email,
      password: hash,
      role: "admin", // explícito
    });

    res.status(201).json({
      message: "Administrador creado correctamente",
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error al crear admin:", error);
    res.status(500).json({ error: "Error interno al crear admin" });
  }
};

module.exports = {
  createAdmin,
  getAllUsers,
};
